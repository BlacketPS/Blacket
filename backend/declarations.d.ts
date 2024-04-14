import { Session } from "src/core/guard";

declare global {
    namespace Express {
        interface Request {
            session: Session | undefined;
        }
    }
}

declare module "socket.io" {
    interface Socket {
        session: Session | undefined;
    }
}

export { };
