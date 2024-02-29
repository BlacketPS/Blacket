import { createContext, useContext, useEffect, useState } from "react";

const SocketStoreContext = createContext();

export function useSocket() {
    return useContext(SocketStoreContext);
}

export function SocketStoreProvider({ children }) {
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);
    const [listeners, setListeners] = useState({});
    const [tooManyConnections, setTooManyConnections] = useState(false);

    const initializeSocket = () => {
        setSocket(null);
        setConnected(false);

        const socket = new WebSocket(`${window.location.protocol === "https:" ? `wss` : `ws`}://${window.location.host}/api/socket?token=${localStorage.getItem("token")}`);

        socket.onopen = () => {
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

        socket.emit = (event, data) => socket.send(JSON.stringify({ event, data }));

        if (import.meta.env.MODE === "development") window.socket = socket;

        setSocket(socket);
    }

    const socketOn = (event, callback) => setListeners(prevListeners => {
        prevListeners[event] = callback;
        return prevListeners;
    });

    const socketOff = (event) => setListeners(prevListeners => {
        delete prevListeners[event];
        return prevListeners;
    });

    const socketOffAll = () => setListeners({});

    const socketEmit = (event, data) => socket.send(JSON.stringify({ event, data }));

    useEffect(() => {
        initializeSocket();

        return () => {
            if (socket) {
                socket.close();

                setSocket(null);
            }
        }
    }, []);


    return <SocketStoreContext.Provider value={{ socket, connected, initializeSocket, socketOn, socketOff, socketOffAll, socketEmit }}>
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