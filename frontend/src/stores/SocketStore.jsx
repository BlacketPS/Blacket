import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketStoreContext = createContext();

export function useSocket() {
    return useContext(SocketStoreContext);
}

export function SocketStoreProvider({ children }) {
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);
    const [tooManyConnections, setTooManyConnections] = useState(false);

    const initializeSocket = () => {
        setSocket(null);
        setConnected(false);

        // const socket = new WebSocket(`${window.location.protocol === "https:" ? "wss" : "ws"}://${window.location.host}/api/socket${token ? `?token=${token}` : localStorage.getItem("token") ? `?token=${localStorage.getItem("token")}` : ""}`);

        const socket = io(`${window.location.protocol}//${window.location.host}`, {
            path: "/gateway",
            auth: { token: localStorage.getItem("token") },
            transports: ["websocket"]
        });

        /* socket.onopen = () => {
            setConnected(true);

            console.info("[Blacket] Connected to WebSocket server.");
        }

        socket.onmessage = (msg) => {
            const { event, data } = JSON.parse(msg.data);

            if (event === "too-many-connections") {
                console.warn("[Blacket] Too many connections, closing WebSocket connection...");

                setTooManyConnections(true);

                socket.onclose = () => {
                    setConnected(false);

                    console.info("[Blacket] Disconnected from WebSocket server.");
                }

                socket.close();
            }

            if (import.meta.env.MODE === "development") console.log(JSON.parse(msg.data));

            if (listeners[event]) listeners[event](data);
        }

        socket.onclose = () => {
            setConnected(false);

            console.info("[Blacket] Disconnected from WebSocket server.");
            console.info("[Blacket] Reconnecting to WebSocket server...");

            initializeSocket();
        }

        socket.emit = (event, data) => socket.send(JSON.stringify({ event, data })); */

        socket.on("connect", () => {
            setConnected(true);

            console.info("[Blacket] Connected to WebSocket server.");
        });

        socket.on("disconnect", () => {
            setConnected(false);

            console.info("[Blacket] Disconnected from WebSocket server.");
            console.info("[Blacket] Reconnecting to WebSocket server...");

            initializeSocket();
        });

        socket.on("too-many-connections", () => {
            console.warn("[Blacket] Too many connections, closing WebSocket connection...");

            setTooManyConnections(true);

            socket.close();
        });

        socket.onAny((_, event, data) => {
            if (import.meta.env.MODE === "development") console.log({ event, data });
        });

        if (import.meta.env.MODE === "development") window.socket = socket;

        setSocket(socket);
    }

    useEffect(() => {
        initializeSocket();

        return () => {
            socket?.close();

            setSocket(null);
        }
    }, []);

    return <SocketStoreContext.Provider value={{ socket, connected, initializeSocket }}>
        {!tooManyConnections ? children : <div style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            transform: "scale(0.9)"
        }}>
            <h1>You have too many connections open, please close some tabs or disconnect some devices and try again.</h1>
        </div>}
    </SocketStoreContext.Provider>
}
