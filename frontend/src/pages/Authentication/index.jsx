import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { config } from "@stores/config";
import { user } from "@stores/user";
import Background from "@components/Background";
import Loader from "@components/Loader";
import axios from "axios";
import styles from "@styles/index";

export default function Authentication({ type }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [codeNeeded, setCodeNeeded] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    document.title = `${type} | ${config.name}`;

    useEffect(() => {
        // if (user) navigate("/stats");
    }, []);

    const login = () => {
        setLoading(true);
        setError("");
        if (!username || !password) return setError("Please enter a username and password.");
        axios.post("/api/authentication/login", {
            username,
            password,
            code
        }).then((res) => {
            if (res.status === 202) return setCodeNeeded(true);
            if (res.data.error) return setError(res.data.error);

            else navigate("/stats");
        }).catch((err) => setError(err.response.data.error)).finally(() => setLoading(false));
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
                    <Background />

                    <form className={styles.authentication.container}>
                        <div className={styles.authentication.containerHeader}>{type}</div>
                        <div className={`${styles.authentication.inputContainer} ${styles.authentication.inputFilled}`}>
                            <i className={`${styles.authentication.icon} fas fa-user ${styles.authentication.iconFilled}`} />
                            <input className={styles.authentication.input} placeholder="Username" type="text" autoComplete="username" onClick={() => { setError(""); setCodeNeeded(false); setCode("") }} onChange={(e) => { setUsername(e.target.value); setCodeNeeded(false); setCode("") }} />
                        </div>
                        <div className={`${styles.authentication.inputContainer} ${styles.authentication.inputFilled}`}>
                            <i className={`${styles.authentication.icon} fas fa-lock ${styles.authentication.iconFilled}`} style={{ fontSize: "23px" }} />
                            <input className={styles.authentication.input} placeholder="Password" type="password" autoComplete="current-password" onClick={() => { setError(""); setCodeNeeded(false); setCode("") }} onChange={(e) => { setPassword(e.target.value); setCodeNeeded(false); setCode("") }} />
                        </div>
                        {codeNeeded && <div className={`${styles.authentication.inputContainer} ${styles.authentication.inputFilled}`}>
                            <i className={`${styles.authentication.icon} fas fa-key ${styles.authentication.iconFilled}`} />
                            <input className={styles.authentication.input} placeholder="OTP / 2FA code" type="text" defaultValue={code} onChange={(e) => setCode(e.target.value)} />
                        </div>
                        }
                        <input type="submit" className={`${styles.authentication.button} ${styles.authentication.buttonFilled}`} value={type} tabIndex={0} onClick={((e) => {
                            e.preventDefault();
                            if (type == "Login") login();
                            else register();
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
}