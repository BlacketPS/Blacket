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

        events.push((await import(`../${file}`)).default);
        events[total].path = file;

        console.debug(`Registered socket event ./${events[total].path}`);

        total++;
    }

    console.success(`Loaded ${total} socket event(s).`);

    global.clients = {};

    app.ws("/api/socket", async (ws, req) => {
        if (!req.query.token || req.query.token === "null") return;

        const token = await decodeSession(req.query.token).catch(() => null);
        if (!token) return;

        const session = await global.redis.GET(`blacket-session:${token.user}`).then(session => JSON.parse(session)).catch(() => null);
        if (!session) return;

        if (session.id !== token.id || session.user !== token.user || session.createdAt !== token.createdAt) return;

        if (global.clients[session.user] && global.clients[session.user].length > 10) return ws.close();

        ws.send(JSON.stringify({ type: "connected" }));

        if (!global.clients[session.user]) global.clients[session.user] = [ws];
        else global.clients[session.user].push(ws);

        ws.on("message", async (message) => {
            message = JSON.parse(message);

            for (const event of events) {

            }
        });

        ws.on("close", () => {
            if (!global.clients[session.user]) return;

            global.clients[session.user] = global.clients[session.user].filter(conn => conn !== ws);
            if (global.clients[session.user].length === 0) delete global.clients[session.user];
        });
    });
}