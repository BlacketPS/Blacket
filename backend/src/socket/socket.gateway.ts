import { UseGuards } from "@nestjs/common";
import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { WsAuthGuard } from "src/core/guard";
import { Session } from "src/core/guard/auth.guard";
import { SequelizeService } from "src/sequelize/sequelize.service";
import { UsersService } from "src/users/users.service";
import { Message, User } from "src/models";
import { Repository } from "sequelize-typescript";
import { PublicUser } from "src/users/entity/publicUser.entity";

export interface BlacketSocket extends Socket {
    session: Session;
}

@WebSocketGateway(0, { path: "/gateway" })
export class SocketGateway implements OnGatewayConnection {
    private messageRepo: Repository<Message>;
    private userRepo: Repository<User>;

    constructor(
        private readonly sequelizeService: SequelizeService,
        private readonly usersService: UsersService
    ) {
        this.messageRepo = this.sequelizeService.getRepository(Message);
        this.userRepo = this.sequelizeService.getRepository(User);
    }

    @WebSocketServer()
    server: Server;

    handleConnection(client: BlacketSocket) {
    }

    @UseGuards(WsAuthGuard)
    @SubscribeMessage("messages-send")
    async send(client: BlacketSocket, data: any) {
        const message = await this.messageRepo.create({
            authorId: client.session.userId,
            content: data.content,
            roomId: 0,
            replyingToId: data.replyingTo ? data.replyingTo : null
        });

        const user = await this.usersService.getUser(client.session.userId);

        this.server.emit("messages-create", {
            message: {
                id: message.id,
                author: new PublicUser(user.toJSON()),
                content: message.content,
                mentions: [],
                replyingTo: null,
                edited: false,
                deleted: false,
                createdAt: message.createdAt
            }
        });

        client.emit("messages-send", { id: message.id, mentions: [], nonce: data.nonce });
    }
}
