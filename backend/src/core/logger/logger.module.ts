import { Module } from "@nestjs/common";
import { BlacketLoggerService } from "./logger.service";

@Module({
    providers: [BlacketLoggerService],
    exports: [BlacketLoggerService]
})
export class LoggerModule {}
