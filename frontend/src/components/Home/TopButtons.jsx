import { Link } from "react-router-dom";
import styles from "@styles";

export default function TopButtons() {
    return (
        <div className={styles.home.topButtonContainer}>
            <Link className={`${styles.home.topButton} ${styles.home.loginButton}`} to="/login">Login</Link>
            <Link className={`${styles.home.topButton} ${styles.home.registerButton}`} to="/register">Register</Link>
        </div>
    )
}