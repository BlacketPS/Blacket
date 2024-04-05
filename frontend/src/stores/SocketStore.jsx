import { createContext, useContext, useEffect, useState } from "react";

// Create a context for the socket store
const SocketStoreContext = createContext();

/**
 * The hook that allows components to interact with the socket store.
 * 
 * @property {Object} socket The WebSocket connection.
 * @property {Boolean} connected The connection state.
 * @property {Function} initializeSocket The function to initialize the WebSocket connection.
 * @property {Function} socketOn The function to add a listener to the WebSocket connection.
 * @property {Function} socketOff The function to remove a listener from the WebSocket connection.
 * @property {Function} socketOffAll The function to remove all listeners from the WebSocket connection.
 * @property {Function} socketEmit The function to emit an event to the WebSocket connection.
 *
 * @returns {Object} The socket store context.
 */
export function useSocket() {
    return useContext(SocketStoreContext);
}

/**
 * The provider for the socket store.
 * @param {Object} props The properties of the component.
 * @param {Object} props.children The children components.
 * @returns The socket store provider.
 */
export function SocketStoreProvider({ children }) {
    // Get/set the WebSocket connection
    const [socket, setSocket] = useState(null);

    // Get/set the connection state
    const [connected, setConnected] = useState(false);

    // Get/set the listeners
    const [listeners, setListeners] = useState({});

    // Get/set if there are too many connections
    const [tooManyConnections, setTooManyConnections] = useState(false);

    // Initialize the WebSocket connection
    const initializeSocket = (token) => {
        // Close the current WebSocket connection
        setSocket(null);
        setConnected(false);

        // Create a new WebSocket connection
        const socket = new WebSocket(`${window.location.protocol === "https:" ? "wss" : "ws"}://${window.location.host}/api/socket${token ? `?token=${token}` : localStorage.getItem("token") ? `?token=${localStorage.getItem("token")}` : ""}`);

        // When the WebSocket connection is opened, set the connection state to true and log that the connection was successful
        socket.onopen = () => {
            setConnected(true);

            console.info("[Blacket] Connected to WebSocket server.");
        }

        // When the WebSocket connection receives a message, parse the message and call the listener for the event
        socket.onmessage = (msg) => {
            // Parse the message
            const { event, data } = JSON.parse(msg.data);

            // If the event is "too-many-connections", log that there are too many connections and close the WebSocket connection
            if (event === "too-many-connections") {
                console.warn("[Blacket] Too many connections, closing WebSocket connection...");

                //  Set that there are too many connections
                setTooManyConnections(true);

                // Set the connection state to false when the WebSocket connection is closed
                socket.onclose = () => {
                    setConnected(false);

                    console.info("[Blacket] Disconnected from WebSocket server.");
                }

                socket.close();
            }

            // Debug the message if the environment is in development
            if (import.meta.env.MODE === "development") console.log(JSON.parse(msg.data));

            // Call the listener for the event
            if (listeners[event]) listeners[event](data);
        }

        // When the WebSocket connection is closed, set the connection state to false and log that the connection was closed. Attempt to reconnect to the WebSocket server after the connection is closed
        socket.onclose = () => {
            setConnected(false);

            // Log that the WebSocket connection was closed and that the WebSocket connection is reconnecting
            console.info("[Blacket] Disconnected from WebSocket server.");
            console.info("[Blacket] Reconnecting to WebSocket server...");

            // Re-initialize the WebSocket connection
            initializeSocket();
        }

        // The socket emit function who sends an event to the WebSocket server
        socket.emit = (event, data) => socket.send(JSON.stringify({ event, data }));

        // Exposes the socket to the window object if the environment is in development
        if (import.meta.env.MODE === "development") window.socket = socket;

        // Sets the WebSocket connection
        setSocket(socket);
    }

    // Add a listener to the WebSocket connection
    const socketOn = (event, callback) => setListeners(prevListeners => {
        prevListeners[event] = callback;
        return prevListeners;
    });

    // Remove a listener from the WebSocket connection
    const socketOff = (event) => setListeners(prevListeners => {
        delete prevListeners[event];
        return prevListeners;
    });

    // Remove all listeners from the WebSocket connection
    const socketOffAll = () => setListeners({});

    // Emit an event to the WebSocket connection
    const socketEmit = (event, data) => socket.send(JSON.stringify({ event, data }));

    useEffect(() => {
        // Establish an initial connection to the WebSocket server
        initializeSocket(null);

        return () => {
            // Close the WebSocket connection when the component is unmounted
            socket?.close();
            
            setSocket(null);
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