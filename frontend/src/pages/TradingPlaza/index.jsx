import { Navigate } from "react-router-dom";
import { useUser } from "@stores/UserStore";
import styles from "@styles";

export default function TradingPlaza() {
    const { user } = useUser();

    if (!user) return <Navigate to="/login" />;
    else return (
        <div className={styles.all.sidebarBody}>

        </div>
    )
}
