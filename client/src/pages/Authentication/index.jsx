import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import axios from "axios";
import styles from "../../styles/index.jsx";

export default function Authentication({ type }) {
    const [config, setConfig] = useState({});
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get("https://blacket.org/worker/config").then((res) => setConfig(res.data));
        document.title = `${type} | ${config.name}`;
    }, []);

    return (
        <div className={isMobile ? styles.authentication.mBody : styles.authentication.body} style={{ backgroundColor: "rgb(11, 194, 207)" }}>
            <div className={styles.authentication.header}>
                <Link className={styles.authentication.blacketText} to="/">{config.name}</Link>
                <Link className={styles.authentication.headerRight} to={type === "Login" ? "/register" : "/login"}>{type === "Login" ? "Register" : "Login"}</Link>
            </div>
            <div className={styles.authentication.regularBody}>
                <div className={styles.authentication.background}>
                    <div className={styles.authentication.blooksBackground} style={{ backgroundImage: "url('/content/background.png')" }}></div>
                </div>

                <form className={styles.authentication.container}>
                    <div className={styles.authentication.containerHeader}>{type}</div>
                    <div className={`${styles.authentication.inputContainer} ${styles.authentication.inputFilled}`}>
                        <i className={`${styles.authentication.icon} fas fa-user ${styles.authentication.iconFilled}`} aria-hidden="true" />
                        <input className={styles.authentication.input} placeholder="Username/Email" type="text" autoComplete="username" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className={`${styles.authentication.inputContainer} ${styles.authentication.inputFilled}`}>
                        <i className={`${styles.authentication.icon} fas fa-lock ${styles.authentication.iconFilled}`} style={{ fontSize: "23px" }} aria-hidden="true" />
                        <input className={styles.authentication.input} placeholder="Password" type="password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <input type="submit" className={`${styles.authentication.button} ${styles.authentication.buttonFilled}`} tabIndex={0} value={type} />
                </form>
            </div>
        </div>
    )
}