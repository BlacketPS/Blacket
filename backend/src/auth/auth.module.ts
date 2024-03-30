import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
    imports: [],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule { }
