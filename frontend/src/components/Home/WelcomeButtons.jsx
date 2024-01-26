import { Link } from "react-router-dom";
import styles from "@styles";

export default function WelcomeButtons() {
    const discordInvite = import.meta.env.VITE_INFORMATION_DISCORD_INVITE;

    return (
        <div className={styles.home.welcomeButtonContainer}>
            <Link className={styles.home.welcomeButton} to="/register">Register</Link>
            {discordInvite !== "" && <a className={styles.home.welcomeButton} href={`https://discord.com/invite/${discordInvite}`} target="_blank">
                Discord
            </a>}
        </div>
    )
}