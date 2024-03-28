import { Module } from "@nestjs/common";
import { DefaultService } from "./default.service";
import { DefaultController } from "./default.controller";

@Module({
    providers: [DefaultService],
    controllers: [DefaultController]
})
export class DefaultModule {}
