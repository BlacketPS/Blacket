import { Link } from "react-router-dom";
import { useUser } from "@stores/UserStore";
import styles from "@styles";

/**
 * The welcome buttons component.
 * @returns {JSX.Element} The welcome buttons component.
 */
export default function WelcomeButtons() {
    // Get the user from the user store.
    const { user } = useUser();

    // Get the discord invite from the environment variables.
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