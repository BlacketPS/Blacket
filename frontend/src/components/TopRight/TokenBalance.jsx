import { useUser } from "@stores/UserStore";
import styles from "@styles";

export default function TokenBalance() {
    const { user } = useUser();

    return (
        <div className={styles.topRight.tokenBalance}>
            <img src="/content/token.png" draggable={false} />
            {user.tokens.toLocaleString()}
        </div>
    )
}