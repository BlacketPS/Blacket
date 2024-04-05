import { Body, Controller, Delete, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto, LoginDto } from "./dto";
import { GetCurrentUserId, Public, RealIp } from "src/core/decorator";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Public()
    @Post("register")
    register(@Body() dto: RegisterDto, @RealIp() ip: string) {
        return this.authService.register(dto, ip);
    }

    @Public()
    @Post("login")
    login(@Body() dto: LoginDto, @RealIp() ip: string) {
        return this.authService.login(dto, ip);
    }

    @Delete("logout")
    @HttpCode(HttpStatus.RESET_CONTENT)
    logout(@GetCurrentUserId() userId) {
        return this.authService.logout(userId);
    }
}

