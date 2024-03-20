import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "./auth/auth.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: "../.env"
        }),
        
        SequelizeModule.forRoot({
            dialect: "postgres",
            username: process.env.SERVER_DATABASE_USER || "postgres",
            password: process.env.SERVER_DATABASE_PASSWORD || "",
            database: process.env.SERVER_DATABASE_NAME || "blacket",
            host: process.env.SERVER_DATABASE_HOST || "localhost",
            port: parseInt(process.env.SERVER_DATABASE_PORT) || 5432,
            autoLoadModels: true,
            synchronize: true
        }),

        AuthModule
    ],
    controllers: [],
    providers: []
})
export class AppModule { }