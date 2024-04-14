import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { RedisService } from "src/redis/redis.service";
import { Request } from "express";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../decorator";
import { safelyParseJSON } from "../functions";

export interface Session {
    id: string;
    userId: string;
    createdAt: Date;
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly redisService: RedisService,
        private reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (isPublic) return true;

        const request: Request = context.switchToHttp().getRequest();

        const token = this.extractTokenFromHeader(request);

        if (!token) throw new UnauthorizedException();

        const decodedToken = safelyParseJSON(Buffer.from(token, "base64").toString());
        if (!decodedToken) throw new UnauthorizedException();

        const session: Session = safelyParseJSON(await this.redisService.get(`blacket-session:${decodedToken.userId}`) as string);
        if (!session) throw new UnauthorizedException();

        if (decodedToken.id !== session.id) throw new UnauthorizedException();

        request.session = session;

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        return request.headers.authorization ?? undefined;
    }
}
