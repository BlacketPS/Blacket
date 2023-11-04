import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "@styles/index";
import Background from "@components/Background";
import Header from "@components/Header";

export default function Authentication({ type }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState(null);

    return (
        <div className={styles.authentication.outerContainer}>
            <Background />
            <Header right={{
                link: type === "Login" ? "/register" : "/login",
                text: type === "Login" ? "Register" : "Login"
            }} />
            <div className={styles.authentication.regularBody}>
                <div className={styles.authentication.floatingBox}>
                    <div className={styles.authentication.floatingBoxHeader}>{type}</div>
                    <div className={styles.authentication.inputContainer}>
                        <i className={`fas fa-user ${styles.authentication.icon}`} />
                        <input className={styles.authentication.input} placeholder="Username" type="text" autoComplete="username" maxLength={16} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className={styles.authentication.inputContainer}>
                        <i className={`fas fa-lock ${styles.authentication.icon} ${styles.authentication.smallerIcon}`} />
                        <input className={styles.authentication.input} placeholder="Password" type="password" autoComplete="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {
                        type === "Register" && <div className={styles.authentication.agreeHolder}>
                            <div className={`${styles.authentication.checkBox} ${checked ? `${styles.authentication.checkYes}` : `${styles.authentication.checkNo}`}`} onClick={(e) => { e.preventDefault(); setChecked(!checked); setError({ error: false, password: false, username: false, check: false, message: "" }); }}>
                                <i className={`fas fa-check ${styles.authentication.checkIcon}`} />
                            </div>
                            <div className={styles.authentication.agreeText}>
                                I am at least 13 years old (or at least 16 outside of the U.S.) and I agree to the <Link to="/privacy" className={styles.authentication.link} target="_blank" rel="noopener noreferrer">Privacy Policy </Link>
                                &amp; <Link to="/terms" className={styles.authentication.link} target="_blank" rel="noopener noreferrer">Terms of Service.</Link>
                            </div>
                        </div>
                    }
                    <button className={styles.authentication.button} tabIndex={0} onClick={(e) => { e.preventDefault(); }}>Let&apos;s Go!</button>
                    {error && <div className={styles.authentication.blErrorContainer}>
                        <i className={`fas fa-times-circle ${styles.authentication.blErrorIcon}`} />
                        <div className={styles.authentication.blErrorText}>{error}</div>
                    </div>}
                </div>
            </div >
        </div>
    )
}   