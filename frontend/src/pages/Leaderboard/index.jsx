import { Navigate } from "react-router-dom";
import { useUser } from "@stores/UserStore";
import styles from "@styles";

export default function Leaderboard() {
    document.title = `Leaderboard | ${import.meta.env.VITE_INFORMATION_NAME}`;

    const { user } = useUser();

    if (!user) return <Navigate to="/login" />;
    else return (
        <div className={styles.all.sidebarBody}>
            <h1>
                Leaderboard
            </h1>
        </div>
    )
}
