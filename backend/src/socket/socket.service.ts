import { Injectable } from "@nestjs/common";
import { RedisService } from "src/redis/redis.service";
import { Socket } from "socket.io";
import { Session } from "src/core/guard";
import { safelyParseJSON } from "src/core/functions";

@Injectable()
export class SocketService {
    constructor(
        private readonly redisService: RedisService
    ) { }

    async verifyConnection(client: Socket) {
        const token = client.handshake.auth.token as string | null;

        if (!token) return client.emit("unauthorized", { message: "no token provided" });

        const decodedToken = safelyParseJSON(Buffer.from(token, "base64").toString());
        if (!decodedToken) return client.emit("unauthorized", { message: "invalid token" });

        const session: Session = safelyParseJSON(await this.redisService.get(`blacket-session:${decodedToken.userId}`) as string);
        if (!session) return client.emit("unauthorized", { message: "invalid session" });

        if (decodedToken.id !== session.id) return client.emit("unauthorized", { message: "token mismatch" });

        client.session = session;

        return client.send("authenticated", { userId: client.session.userId });
    }
}
