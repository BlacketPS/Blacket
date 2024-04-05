import { useUser } from "@stores/UserStore";
import { useSocket } from "@stores/SocketStore";
import styles from "@styles";

/**
 * The debug information component.
 * @returns {JSX.Element} The debug information component.
 */
export default function DebugInformation() {
    // Get the user from the user store.
    const { user } = useUser();

    // Get the socket and connected status from the socket store.
    const { socket, connected } = useSocket();

    return (
        <div className={styles.debug.container}>
            <div>Running Blacket {import.meta.env.VITE_INFORMATION_VERSION}</div>
            <div>Connected to WebSocket: {JSON.stringify(connected)}</div>
            {user && <div>User ID: {user.id}</div>}
        </div>
    )
}