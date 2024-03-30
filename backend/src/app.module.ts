import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { SequelizeModule } from "./sequelize/sequelize.module";
import { RedisModule } from "./redis/redis.module";
import { DefaultModule } from "./default/default.module";
import { DataModule } from "./data/data.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { LoggerModule } from "./core/logger/logger.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./core/guard";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: "../.env" }),

        LoggerModule,
        SequelizeModule,
        RedisModule,
        DefaultModule,
        DataModule,
        AuthModule,
        UsersModule
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
    ]
})
export class AppModule { }
