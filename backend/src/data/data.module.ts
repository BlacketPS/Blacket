import { Module } from "@nestjs/common";
import { DataService } from "./data.service";
import { DataController } from "./data.controller";

@Module({
    providers: [DataService],
    controllers: [DataController]
})
export class DataModule {}
