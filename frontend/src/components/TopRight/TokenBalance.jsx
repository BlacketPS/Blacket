import { useUser } from "@stores/UserStore";
import styles from "@styles";

/**
 * The token balance component.
 * @returns {JSX.Element} The token balance component.
 */
export default function TokenBalance() {
    // Get the user from the user store.
    const { user } = useUser();

    return (
        <div className={styles.topRight.tokenBalance}>
            <img src="/content/token.png" draggable={false} />
            {user.tokens.toLocaleString()}
        </div>
    )
}