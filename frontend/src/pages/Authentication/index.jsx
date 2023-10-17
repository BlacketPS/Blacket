import { useState } from "react";
import { config } from "@stores/config";
import { Link } from "react-router-dom";
import Background from "@components/Background";
import styles from "@styles";

export default function Authentication({ type }) {
    // const { user, getLoggedIn } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ error: false, password: false, username: false, message: "" });

    // return (
    //     <div className={styles.authentication.outerContainer}>
    //         <Background />
    //         <div className={styles.authentication.mainheader}><Link className={styles.authentication.blacketText} to="/">{config.name}</Link><Link className={styles.authentication.headerRight} to="/signup">Sign Up</Link></div>
    //         <div className={styles.authentication.regularBody}>
    //             <div className={styles.authentication.floatingBox}>
    //                 <div className={styles.authentication.floatingBoxHeader}>Login</div>
    //                 <form>
    //                     <div className={`${styles.authentication.inputContainer} ${error.username ? `${styles.authentication.inputError}` : ""}`}>
    //                         <i className={`fas fa-user ${styles.authentication.icon} ${error.username ? `${styles.authentication.iconError}` : ""}`} />
    //                         <input className={styles.authentication.input} placeholder="Username" type="text" autoComplete="username" maxLength={16} onChange={(e) => setUsername(e.target.value)} />
    //                     </div>
    //                     <div className={`${styles.authentication.inputContainer} ${error.password ? `${styles.authentication.inputError}` : ""}`}>
    //                         <i className={`fas fa-lock ${styles.authentication.icon} ${styles.authentication.smallerIcon} ${error.password ? `${styles.authentication.iconError}` : ""}`} />
    //                         <input className={styles.authentication.input} placeholder="Password" type="password" autoComplete="password" onChange={(e) => setPassword(e.target.value)} />
    //                     </div>
    //                     <button className={`${styles.authentication.button} ${error.error ? `${styles.authentication.buttonError}` : ""}`} tabIndex={0} onClick={(e) => { e.preventDefault(); login(); }}>Let's Go!</button>
    //                 </form>
    //                 {error.error && <div className={styles.authentication.blErrorContainer}>
    //                     <i className={`fas fa-times-circle ${styles.authentication.blErrorIcon}`} />
    //                     <div className={styles.authentication.blErrorText}>{error.message}</div>
    //                 </div>}
    //                 {loading && <div className={styles.authentication.blLoaderContainer}>
    //                     <div className={styles.authentication.blLoader}>
    //                         <div className={styles.authentication.blLoaderShadow}></div>
    //                         <img src="/contentcontentcontentcontentcontentcontentcontent/" alt="Blook" draggable="false" className={styles.authentication.blLoaderBlook} />
    //                     </div>
    //                 </div>}

    //                 <div className={styles.authentication.switchAuthTypeLink}>Don't have an account?&nbsp;<Link to="/signup">Sign up</Link>&nbsp;instead.</div>
    //             </div>
    //         </div>
    //     </div>
    // )
}
