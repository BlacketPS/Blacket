import { Link } from "react-router-dom";
import { config } from "@stores/config";
import styles from "@styles/index";
import Background from "@components/Background";

export default function Home() {
    const pronunciations = ["/content/pronunciation-monkxy.ogg", "/content/pronunciation-xotic.ogg", "/content/pronunciation-zastix.ogg"];

    return (
        <>
            <div className={styles.home.headerContainer}>
                <img src="/content/homeBlooks.png" alt="Blooks" className={styles.home.headerImage} draggable="false" />

                <Background color="#3f3f3f" opacity={0.075} />

                <div className={styles.home.headerSide} />

                <div className={styles.home.topHeaderContainer}>
                    <div className={styles.home.logoText}>
                        {config.name}
                    </div>
                </div>

                <div className={styles.home.welcomeContainer}>
                    <div className={styles.home.welcomeText}>
                        {config.welcome && config.welcome.split(" ").map((word, i) => (<div key={i}>{word}</div>))}
                    </div>
                    <div className={styles.home.welcomeDesc}>
                        {config.description && config.description.split(",").map((word, i) => (<div key={i}>{word}</div>))}
                    </div>

                    <Link className={styles.home.welcomeButton} to="/register">Register</Link>

                    <a className={styles.home.welcomeButton} href={`https://discord.com/invite/${config.discord}`} target="_blank" style={{ marginTop: "10px" }}>
                        Discord
                    </a>

                    <div className={styles.home.pronounceButton} onClick={() => new Audio(pronunciations[Math.floor(Math.random() * pronunciations.length)]).play()}>
                        <i className="fas fa-volume-up" /> Pronunciation ("{config.pronunciation}")
                    </div>
                </div>
            </div>

            <div className={styles.home.topButtonContainer}>
                <Link className={`${styles.home.topButton} ${styles.home.loginButton}`} to="/login">
                    Login
                </Link>
                <Link className={`${styles.home.topButton} ${styles.home.registerButton}`} to="/register">
                    Register
                </Link>
            </div>
        </>
    )
}