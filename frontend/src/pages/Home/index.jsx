import { Link } from "react-router-dom";
import styles from "@styles";
import Background from "@components/Background";

const env = {
    name: import.meta.env.VITE_INFORMATION_NAME,
    welcome: import.meta.env.VITE_INFORMATION_WELCOME,
    description: import.meta.env.VITE_INFORMATION_DESCRIPTION,
    pronunciation: import.meta.env.VITE_INFORMATION_PRONUNCIATION,
    discordInvite: import.meta.env.VITE_INFORMATION_DISCORD_INVITE,
    version: import.meta.env.VITE_INFORMATION_VERSION
}

export default function Home() {
    document.title = env.name;

    return (
        <>
            <div className={styles.home.headerContainer}>
                <img src="/content/falling-blooks.png" alt="Blooks" className={styles.home.headerImage} draggable="false" />

                <Background />

                <div className={styles.home.headerSide} />

                <div className={styles.home.topHeaderContainer}>
                    <div className={styles.home.logoText}>{env.name}</div>
                </div>

                <div className={styles.home.welcomeContainer}>
                    <div className={styles.home.welcomeText}>
                        {env.welcome.split(" ").map((word, i) => (<div key={i}>{word}</div>))}
                    </div>
                    <div className={styles.home.welcomeDescription}>
                        {env.description.split(",").map((word, i) => (<div key={i}>{word}</div>))}
                    </div>

                    <div className={styles.home.welcomeButtonContainer}>
                        <Link className={styles.home.welcomeButton} to="/register">Register</Link>
                        {env.discordInvite !== "" && <a className={styles.home.welcomeButton} href={`https://discord.com/invite/${env.discordInvite}`} target="_blank">
                            Discord
                        </a>}
                    </div>

                    {env.pronunciation !== "" && <div className={styles.home.pronounceButton} onClick={() => new Audio("/content/pronunciation.ogg").play()}>
                        <i className="fas fa-volume-up" /> Pronunciation ("{env.pronunciation}")
                    </div>}
                </div>
            </div>

            <div className={styles.home.topButtonContainer}>
                <Link className={`${styles.home.topButton} ${styles.home.loginButton}`} to="/login">Login</Link>
                <Link className={`${styles.home.topButton} ${styles.home.registerButton}`} to="/register">Register</Link>
            </div>

            <div className={styles.home.copyrightInformation}>
                We are not affiliated with Blooket in any way.
                <br />
                Please do not contact Blooket about any issues you may have with {env.name}.
                <br />
                {env.name} © {new Date().getFullYear()} All Rights Reserved.
            </div>

            <div className={styles.home.versionInformation}>Running Blacket v{env.version}</div>
            <Link to="/terms" className={styles.home.termsOfServiceLink}>Terms of Service</Link>
        </>
    )
}