import { Module } from "@nestjs/common";
import { FormsService } from "./forms.service";
import { FormsController } from "./forms.controller";
import { UsersService } from "src/users/users.service";

@Module({
    providers: [
        FormsService,
        UsersService
    ],
    controllers: [FormsController]
})
export class FormsModule { }
