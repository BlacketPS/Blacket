import { createContext, useContext, useEffect, useState } from "react";

const SocketStoreContext = createContext();

export function useSocket() {
    return useContext(SocketStoreContext);
}

class BlacketSocket extends WebSocket {
    listeners = {};

    constructor() {
        super(...arguments);

        this.socket = new WebSocket(...arguments);

        this.socket.onopen = () => {
            console.info("[Blacket] Connected to socket server.");
        }

        this.socket.onmessage = (msg) => {
            msg = JSON.parse(msg.data);
            if (this.listeners[msg.event]) this.listeners[msg.event](msg)
            console.log(msg);
        }

        this.socket.onclose = () => {
            console.info("[Blacket] Disconnected from socket server.");
            console.debug("[Blacket] Reconnecting to socket server...");

            this.socket = new BlacketSocket(this.url);
            this.socket.listeners = this.listeners;
        }
    }

    on(event, callback) {
        this.listeners[event] = callback;
    }

    emit(event, data) {
        this.socket.send(JSON.stringify({ event, data }));
    }
}

export function SocketStoreProvider({ children }) {
    const [socket, setSocket] = useState(null);

    const connect = () => {
        setSocket(null);

        setSocket(new BlacketSocket(`${window.location.protocol === "https:" ? `wss` : `ws`}://${window.location.host}/api/socket?token=${localStorage.getItem("token")}`));
    }

    useEffect(() => {
        connect();
    }, []);

    return <SocketStoreContext.Provider value={{ connect }}>{children}</SocketStoreContext.Provider>;
}