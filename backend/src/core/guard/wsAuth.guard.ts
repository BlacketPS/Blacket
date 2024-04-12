import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { RedisService } from "src/redis/redis.service";
import { Reflector } from "@nestjs/core";
import { Session } from "./auth.guard";
import { BlacketSocket } from "src/socket/socket.gateway";
import { IS_PUBLIC_KEY } from "../decorator";

@Injectable()
export class WsAuthGuard implements CanActivate {
    constructor(
        private readonly redisService: RedisService,
        private reflector: Reflector
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (isPublic) return true;

        const client: BlacketSocket = context.switchToWs().getClient();
        const isAuthorized = this.validate(client);

        if (!isAuthorized) throw new UnauthorizedException();

        return isAuthorized;
    }

    async validate(client: BlacketSocket): Promise<boolean> {
        const token = client.handshake.auth.token ?? undefined;

        if (!token) throw new UnauthorizedException();

        try {
            const decodedToken = JSON.parse(Buffer.from(token, "base64").toString());

            const session: Session = JSON.parse(await this.redisService.get(`blacket-session:${decodedToken.userId}`) as string);
            if (!session) throw new UnauthorizedException();

            if (decodedToken.id !== session.id) throw new UnauthorizedException();

            client.session = session;
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }
}
