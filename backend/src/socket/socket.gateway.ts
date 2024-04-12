import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Session } from "src/core/guard/auth.guard";

export interface BlacketSocket extends Socket {
    session: Session;
}

@WebSocketGateway(0, { path: "/gateway" })
export class SocketGateway implements OnGatewayConnection {
    @WebSocketServer()
    server: Server;

    handleConnection(client: BlacketSocket) {
        console.log(client.id);
    }
}
