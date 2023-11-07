import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "@styles/index";
import Background from "@components/Background";
import Header from "@components/Header";
import Input from "@components/Authentication/Input";

export default function Authentication({ type }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState(null);

    return (
        <>
            <Background />

            <Header right={{
                link: type === "Login" ? "/register" : "/login",
                text: type === "Login" ? "Register" : "Login"
            }} />

            <div className={styles.all.regularBody}>
                <div className={styles.authentication.container}>
                    <div className={styles.authentication.containerHeader}>{type}</div>

                    <Input icon="fas fa-user" placeholder="Username" type="text" autoComplete="username" maxLength={16} onChange={(e) => setUsername(e.target.value)} />
                    <Input icon="fas fa-lock" placeholder="Password" type="password" autoComplete="password" onChange={(e) => setPassword(e.target.value)} />

                    {type === "Register" && <div className={styles.authentication.agreeHolder}>
                        <div className={`${styles.authentication.checkBox} ${checked ? styles.authentication.checkYes : styles.authentication.checkNo}`} onClick={() => setChecked(!checked)}>
                            <i className={`fas fa-check ${styles.authentication.checkIcon}`} />
                        </div>

                        <div className={styles.authentication.agreeText}>
                            I am at least 13 years old (or at least 16 outside of the U.S.) and I agree to the
                            <Link to="/privacy" className={styles.authentication.link}>Privacy Policy</Link>
                            &amp; <Link to="/terms" className={styles.authentication.link}>Terms of Service.</Link>
                        </div>
                    </div>}

                    <button className={styles.authentication.button}>Let's Go!</button>
                    {error && <div className={styles.authentication.blErrorContainer}>
                        <i className={`fas fa-times-circle ${styles.authentication.blErrorIcon}`} />
                        <div className={styles.authentication.blErrorText}>{error}</div>
                    </div>}
                </div>
            </div>
        </>
    )
}   