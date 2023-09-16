import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import withConfig from "@components/HOCS/withConfig";
import configStore from "@stores/configStore";
import styles from "@styles/index";

const Home = withConfig(() => {
    const [config] = useState(configStore.config);

    document.title = config.name;

    return (
        <>
            <div className={styles.home.headerContainer}>
                <img src="/content/homeBlooks.png" alt="Blooks" className={styles.home.headerImage} draggable="false" />

                <div className={styles.home.background}>
                    <div className={styles.home.blooksBackground} style={{ backgroundImage: "url('/content/background.png')" }}></div>
                </div>

                <div className={isMobile ? styles.home.mHeaderSide : styles.home.headerSide}></div>

                <div className={styles.home.topHeaderContainer}>
                    <div className={styles.home.logoText}>
                        {config.name}
                    </div>
                </div>

                <div className={isMobile ? styles.home.mWelcomeContainer : styles.home.welcomeContainer}>
                    <div className={isMobile ? styles.home.mWelcomeText : styles.home.welcomeText}>
                        {config.welcome ? config.welcome.split(" ").map((word, i) => (<div key={i}>{word}</div>)) : null}
                    </div>
                    <div className={isMobile ? styles.home.mWelcomeDesc : styles.home.welcomeDesc}>
                        {config.description ? config.description.split(",").map((word, i) => (<div key={i}>{word}</div>)) : null}
                    </div>

                    <Link className={isMobile ? styles.home.mWelcomeButton : styles.home.welcomeButton} to="/register">
                        Register
                    </Link>

                    <a className={isMobile ? styles.home.mWelcomeButton : styles.home.welcomeButton} style={{ marginTop: "10px" }} href={`https://discord.com/invite/${config.discord}`} target="_blank">
                        Discord
                    </a>

                    <div className={isMobile ? styles.home.mPronounceButton : styles.home.pronounceButton} onClick={() => new Audio("/content/pronunciation.ogg").play()}>
                        <i className="fas fa-volume-up" />
                        &nbsp;
                        Pronunciation ("{config.pronunciation}")
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
});

export default Home;