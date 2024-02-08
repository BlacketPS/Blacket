import { useUser } from "@stores/UserStore";
import styles from "@styles";

export default function DebugInformation() {
    const { user } = useUser();

    return (
        <div className={styles.debug.container}>
            <div>Running Blacket {import.meta.env.VITE_INFORMATION_VERSION}</div>
            <div>{user && <>User ID: {user.id}</>}</div>
        </div>
    )
}