import { Global, Module } from "@nestjs/common";
import { SequelizeService } from "./sequelize.service";
import { LoggerModule } from "src/core/logger/logger.module";

@Global()
@Module({
    imports: [LoggerModule],
    providers: [SequelizeService],
    exports: [SequelizeService]
})
export class SequelizeModule {}
