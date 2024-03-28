import { Global, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { RedisService } from "./redis.service";

@Global()
@Module({
    imports: [SequelizeModule.forFeature([])],
    providers: [RedisService],
    exports: [RedisService]
})
export class RedisModule { }
