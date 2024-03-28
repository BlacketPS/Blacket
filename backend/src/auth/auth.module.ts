import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User, Session } from "src/models";

@Module({
    imports: [
        SequelizeModule.forFeature([
            User,
            Session
        ])
    ],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule { }
