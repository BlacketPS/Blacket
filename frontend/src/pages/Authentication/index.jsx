import { useContext, useEffect, useState } from "react";
import { LoadingStoreContext } from "@stores/LoadingStore";
import { UserStoreContext } from "@stores/UserStore";
import { Link, useNavigate } from "react-router-dom";
import styles from "@styles/index";
import Background from "@components/Background";
import { Header } from "@components/Header";
import Input from "@components/Authentication/Input";

export default function Authentication({ type }) {
    document.title = `${type} | ${import.meta.env.VITE_INFORMATION_NAME}`;

    const { setLoading } = useContext(LoadingStoreContext);
    const { user } = useContext(UserStoreContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate("/dashboard");
    }, []);

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

                    <Input icon="fas fa-user" placeholder="Username" type="text" autoComplete="username" maxLength={16} onChange={(e) => {
                        setUsername(e.target.value);
                        setError(null);
                    }} />
                    <Input icon="fas fa-lock" placeholder="Password" type="password" autoComplete="password" onChange={(e) => {
                        setPassword(e.target.value);
                        setError(null);
                    }} />

                    {type === "Register" && <div className={styles.authentication.agreeHolder}>
                        <div className={`${styles.authentication.checkBox} ${checked ? styles.authentication.checkYes : styles.authentication.checkNo}`} onClick={() => {
                            setChecked(!checked);
                            setError(null);
                        }}>
                            <i className={`fas fa-check ${styles.authentication.checkIcon}`} />
                        </div>

                        <div className={styles.authentication.agreeText}>
                            I am at least 13 years old (or at least 16 outside of the U.S.) and I agree to the <Link to="/privacy" className={styles.authentication.link}>Privacy Policy</Link> &amp; <Link to="/terms" className={styles.authentication.link}>Terms of Service.</Link>
                        </div>
                    </div>}

                    <div className={styles.authentication.button} onClick={() => {
                        if (!username) return setError("Where's the username?");
                        if (!password) return setError("Where's the password?");
                        if (password.length < 8) return setError("Your password must be at least 8 characters long.");
                        if (!/\d/.test(password)) return setError("Your password must have at least 1 number.");
                        if (!/[A-Z]/.test(password)) return setError("Your password must have at least 1 uppercase letter.");
                        if (!/[a-z]/.test(password)) return setError("Your password must have at least 1 lowercase letter.");
                        if (/^[a-z0-9]+$/i.test(password)) return setError("Your password must contain a special character.");
                        if (type === "Login") login(username, password);
                        else if (type === "Register") {
                            if (!checked) return setError("You must agree to our Privacy Policy and Terms of Service.");
                            register(username, password);
                        }
                    }}>Let's Go!</div>

                    {error && <div className={styles.authentication.errorContainer}>
                        <i className={`fas fa-times-circle ${styles.authentication.errorIcon}`} />
                        <div className={styles.authentication.errorText}>{error}</div>
                    </div>}
                </div>
            </div>
        </>
    )
}   