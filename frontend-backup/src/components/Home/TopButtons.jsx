import { Link } from "react-router-dom";
import { useUser } from "@stores/UserStore";
import styles from "@styles";

export default function TopButtons() {
    const { user } = useUser();

    return (
        <div className={styles.home.topButtonContainer}>
            {!user && <Link className={`${styles.home.topButton} ${styles.home.loginButton}`} to="/login">Login</Link>}
            {!user ?
                <Link className={`${styles.home.topButton} ${styles.home.registerButton}`} to="/register">Register</Link> :
                <Link className={`${styles.home.topButton} ${styles.home.dashboardButton}`} to="/dashboard">Dashboard</Link>}
        </div>
    )
}