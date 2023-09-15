import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import styles from "./home.module.css";

export default function Home() {
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
                        name
                    </div>
                </div>

                <div className={isMobile ? styles.mWelcomeContainer : styles.welcomeContainer}>
                    <div className={isMobile ? styles.mWelcomeText : styles.welcomeText}>
                        welcome
                    </div>
                    <div className={isMobile ? styles.mWelcomeDesc : styles.welcomeDesc}>
                        description
                    </div>

                    <Link className={isMobile ? styles.mWelcomeButton : styles.welcomeButton} to="/register">
                        Get Started
                    </Link>

                    <div className={isMobile ? styles.mPronounceButton : styles.pronounceButton} onClick={() => new Audio("/pronounce.mp3").play()}>
                        <i className="fas fa-volume-up" />
                        &nbsp;
                        Pronunciation ("")
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