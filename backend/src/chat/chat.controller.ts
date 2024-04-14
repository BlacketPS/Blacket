import { Controller, Get } from "@nestjs/common";
import { ChatService } from "./chat.service";

@Controller("chat")
export class ChatController {
    constructor(private chatService: ChatService) { }

    @Get("messages/:roomId")
    async getMessages(roomId: number) {
        return await this.chatService.getMessages(roomId);
    }
}
