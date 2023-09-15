import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./home.module.css";

export default function Home() {
    const [config, setConfig] = useState({});

    useEffect(() => {
        axios.get("https://blacket.org/worker/config").then((res) => setConfig(res.data));
    }, []);

    return (
        <>
            <div className={styles.headerContainer}>
                <img src="/content/homeBlooks.png" alt="Blooks" className={styles.headerImage} draggable="false" />

                <div class={styles.background}>
                    <div class={styles.blooksBackground} style={{ backgroundImage: "url(\"/content/background.png\")" }}></div>
                </div>

                <div className={isMobile ? styles.mHeaderSide : styles.headerSide}></div>

                <div className={styles.topHeaderContainer}>
                    <div className={styles.logoText}>
                        {config.name}
                    </div>
                </div>

                <div className={isMobile ? styles.mWelcomeContainer : styles.welcomeContainer}>
                    <div className={isMobile ? styles.mWelcomeText : styles.welcomeText}>
                        {config.welcome ? config.welcome.split(" ").map((word) => (<div>{word}</div>)) : null}
                    </div>
                    <div className={isMobile ? styles.mWelcomeDesc : styles.welcomeDesc}>
                        {config.description ? config.description.split(",").map((word) => (<div>{word}</div>)) : null}
                    </div>

                    <Link className={isMobile ? styles.mWelcomeButton : styles.welcomeButton} to="/register">
                        Register
                    </Link>

                    <a className={isMobile ? styles.mWelcomeButton : styles.welcomeButton} style={{ marginTop: "10px" }} href="https://discord.gg/blacket">
                        Discord
                    </a>

                    <div className={isMobile ? styles.mPronounceButton : styles.pronounceButton} onClick={() => new Audio("/content/pronunciation.ogg").play()}>
                        <i className="fas fa-volume-up" />
                        &nbsp;
                        Pronunciation ("{config.pronunciation}")
                    </div>
                </div>
            </div>

            <div class={styles.topButtonContainer}>
                <Link className={`${styles.topButton} ${styles.loginButton}`} to="/login">
                    Login
                </Link>
                <Link class={`${styles.topButton} ${styles.registerButton}`} to="/register">
                    Register
                </Link>
            </div>
        </>
    )
}