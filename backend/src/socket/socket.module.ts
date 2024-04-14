import { Module } from "@nestjs/common";
import { SocketGateway } from "./socket.gateway";
import { SocketService } from "./socket.service";
import { UsersService } from "src/users/users.service";

@Module({
    providers: [
        SocketGateway,
        SocketService,
        UsersService
    ]
})
export class SocketModule { }
