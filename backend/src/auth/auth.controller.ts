import { Body, Controller, Delete, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto, LoginDto } from "./dto";
import { GetCurrentId, Public, RealIp } from "src/core/decorator";
import { Request } from "express";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Public()
    @Post("register")
    register(@Req() req: Request, @Body() dto: RegisterDto, @RealIp() ip: string) {
        return this.authService.register(req, dto, ip);
    }

    @Public()
    @Post("login")
    login(@Req() req: Request, @Body() dto: LoginDto, @RealIp() ip: string) {
        return this.authService.login(req, dto, ip);
    }

    @Delete("logout")
    @HttpCode(HttpStatus.RESET_CONTENT)
    logout(@GetCurrentId() userId) {
        return this.authService.logout(userId);

        // 🗣
    }
}

