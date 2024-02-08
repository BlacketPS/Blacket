import { Link } from "react-router-dom";
import { useUser } from "@stores/UserStore";
import styles from "@styles";

export default function WelcomeButtons() {
    const { user } = useUser();

    const discordInvite = import.meta.env.VITE_INFORMATION_DISCORD_INVITE;

    return (
        <div className={styles.home.welcomeButtonContainer}>
            {!user ?
                <Link className={styles.home.welcomeButton} to="/register">Register</Link>
                :
                <Link className={styles.home.welcomeButton} to="/dashboard">Dashboard</Link>
            }
            {discordInvite !== "" && <a className={styles.home.welcomeButton} href={`https://discord.com/invite/${discordInvite}`} target="_blank">
                Discord
            </a>}
        </div>
    )
}