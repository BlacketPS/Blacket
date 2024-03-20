import expressWs from "express-ws";
import walk from "#functions/internal/walk";
import console from "#functions/internal/console";
import decodeSession from "#functions/sessions/decodeSession";

export default async (app) => {
    expressWs(app);

    const events = [];

    let total = 0;

    for (const file of walk("./sockets")) {
        if (!file.endsWith(".js")) continue;

        const event = (await import(`../${file}`)).default;
        event.path = file.replace("sockets/", "").slice(0, -3);
        event.path = event.path.replaceAll("/", "-");

        events.push(event);

        console.debug(`Registered socket event ./${events[total].path}`);

        total++;
    }

    console.success(`Loaded ${total} socket event(s).`);

    global.ws = {
        clients: {},
        sendToAll: (event, error, data) => {
            for (const client in global.ws.clients) for (const conn of global.ws.clients[client]) conn.send(JSON.stringify({ event, data: { error, ...data } }));
        },
        sendToUser: (user, event, error, data) => {
            if (!global.ws.clients[user]) return;

            for (const conn of global.ws.clients[user]) conn.send(JSON.stringify({ event, data: { error, ...data } }));
        },
        disconnectUser: (user) => {
            if (!global.ws.clients[user]) return;

            for (const conn of global.ws.clients[user]) conn.close();
        }
    }

    app.ws("/api/socket", async (ws, req) => {
        if (!req.query.token) return;

        const token = await decodeSession(req.query.token).catch(() => null);
        if (!token) return;

        const session = await global.redis.GET(`blacket-session:${token.user}`).then(session => JSON.parse(session)).catch(() => null);
        if (!session) return;

        if (session.id !== token.id || session.user !== token.user || session.createdAt !== token.createdAt) return;

        if (global.ws.clients[session.user] && global.ws.clients[session.user].length > 4) ws.send(JSON.stringify({ event: "too-many-connections", data: { error: true } })), ws.close();

        ws.send(JSON.stringify({ event: "connected", data: { error: false, user: session.user } }));

        if (!global.ws.clients[session.user]) global.ws.clients[session.user] = [ws];
        else global.ws.clients[session.user].push(ws);

        ws.authorized = true;
        ws.user = { id: session.user };

        ws.on("message", async (message) => {
            if (!ws.authorized) return ws.send(JSON.stringify({ data: { error: true, message: "unauthorized" } }));

            try {
                message = JSON.parse(message);
            } catch (error) {
                return ws.send(JSON.stringify({ data: { error: true, message: "not a valid JSON string" } }));
            }

            if (!message.event) return ws.send(JSON.stringify({ data: { error: true, message: "event missing" } }));
            if (!message.data) return ws.send(JSON.stringify({ data: { error: true, message: "data missing" } }));

            if (typeof message.event !== "string") return ws.send(JSON.stringify({ data: { error: true, message: "event must be typeof string" } }));
            if (typeof message.data !== "object") return ws.send(JSON.stringify({ data: { error: true, message: "data must be typeof object" } }));

            if (!events.find(event => event.path === message.event)) return ws.send(JSON.stringify({ data: { error: true, message: "event does not exist" } }));

            const event = events.find(event => event.path === message.event);

            ws.respond = (error, data) => ws.send(JSON.stringify({ event: message.event, data: { error, ...data } }));

            await event.event(ws, message.data);
        });

        ws.on("close", () => {
            global.ws.clients[session.user] = global.ws.clients[session.user].filter(conn => conn !== ws);
            if (global.ws.clients[session.user].length === 0) delete global.ws.clients[session.user];
        });
    });
}