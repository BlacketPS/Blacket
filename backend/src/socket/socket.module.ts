import { Module } from "@nestjs/common";
import { SocketGateway } from "./socket.gateway";
import { UsersService } from "src/users/users.service";

@Module({
    providers: [
        SocketGateway,
        UsersService
    ]
})
export class SocketModule { }
