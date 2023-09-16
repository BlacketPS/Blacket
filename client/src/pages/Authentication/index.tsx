import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import withConfig from "@components/HOCS/withConfig";
import configStore from "@stores/configStore";
import Loader from "@components/common/Loader";
import axios from "axios";
import styles from "@styles/index";

const Authentication = withConfig(({ type }: {
    type: "Login" | "Register"
}) => {
    const config = configStore.config

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    document.title = `${type} | ${config.name}`;

    const login = () => {
        setLoading(true);
        if (!username || !password) return setError("Please enter a username and password.");
        axios.post("https://blacket.org/worker/login", {
            username,
            password
        }).then((res) => {
            if (res.data.error) return setError(res.data.reason);
            else navigate("/stats");
        }).catch((err) => setError(err.response.data.reason)).finally(() => setLoading(false));
    }

    const register = () => {
    }

    return (
        <>
            <div className={isMobile ? styles.authentication.mBody : styles.authentication.body}>
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
                            <i className={`${styles.authentication.icon} fas fa-user ${styles.authentication.iconFilled}`} />
                            <input className={styles.authentication.input} placeholder="Username" type="text" autoComplete="username" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className={`${styles.authentication.inputContainer} ${styles.authentication.inputFilled}`}>
                            <i className={`${styles.authentication.icon} fas fa-lock ${styles.authentication.iconFilled}`} style={{ fontSize: "23px" }} />
                            <input className={styles.authentication.input} placeholder="Password" type="password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <input type="submit" className={`${styles.authentication.button} ${styles.authentication.buttonFilled}`} value={type} tabIndex={0} onClick={((e) => {
                            e.preventDefault();
                            if (type == "Login") login(); else register();
                        })} />
                        {error && <div className={styles.authentication.errorContainer}>
                            <i className={`${styles.authentication.errorIcon} fas fa-times-circle`} />
                            <div className={styles.authentication.errorText}>{error}</div>
                        </div>}
                    </form>
                </div>
            </div>
            {loading && <Loader />}
        </>
    )
});

export default Authentication;