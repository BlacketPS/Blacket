import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { CurrentUserPipe } from "../pipe";

export const GetCurrentUserId = createParamDecorator((_: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().session.userId;
});

export const GetCurrentUser = () => GetCurrentUserId(CurrentUserPipe);
