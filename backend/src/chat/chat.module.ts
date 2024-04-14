import { Module } from "@nestjs/common";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { UsersService } from "src/users/users.service";

@Module({
    controllers: [ChatController],
    providers: [
        ChatService,
        UsersService
    ]
})
export class ChatModule { }
