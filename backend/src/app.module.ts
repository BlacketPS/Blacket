import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";

import { RedisModule } from "./redis/redis.module";
import { DefaultModule } from "./default/default.module";
import { DataModule } from "./data/data.module";
import { AuthModule } from "./auth/auth.module";

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: "../.env" }),

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

        RedisModule,
        DefaultModule,
        DataModule,
        AuthModule
    ],
    controllers: [],
    providers: []
})
export class AppModule { }
