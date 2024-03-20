import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Get, Req } from "@nestjs/common";
import { Request } from "express";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Get("register")
    async register(@Req() req: Request) {
        return this.authService.register(req);
    }
}
