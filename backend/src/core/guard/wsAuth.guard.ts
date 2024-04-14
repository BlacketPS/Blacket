import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { Socket } from "socket.io";
import { IS_PUBLIC_KEY } from "../decorator";

@Injectable()
export class WsAuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (isPublic) return true;

        const client: Socket = context.switchToWs().getClient();
        const isAuthorized = this.validate(client);

        if (!isAuthorized) throw new UnauthorizedException();

        return isAuthorized;
    }

    async validate(client: Socket): Promise<boolean> {
        if (!client.session) throw new UnauthorizedException();

        return true;
    }
}
