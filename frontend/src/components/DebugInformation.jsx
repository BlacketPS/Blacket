import { useUser } from "@stores/UserStore";
import { useSocket } from "@stores/SocketStore";
import styles from "@styles";

export default function DebugInformation() {
    const { user } = useUser();
    const { socket, connected } = useSocket();

    return (
        <div className={styles.debug.container}>
            <div>Running Blacket {import.meta.env.VITE_INFORMATION_VERSION}</div>
            <div>Connected to WebSocket: {JSON.stringify(connected)}</div>
            {user && <div>User ID: {user.id}</div>}
        </div>
    )
}