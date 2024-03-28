import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto, LoginDto } from "./dto";
import { Request } from "express";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post("register")
    async register(@Req() req: Request, @Body() dto: RegisterDto) {
        return await this.authService.register(req, dto);
    }

    @Post("login")
    async login(@Req() req: Request, @Body() dto: LoginDto) {
        return await this.authService.login(req, dto);
    }
}
