import { useUser } from "@stores/UserStore";
import { TokenBalance, UserDropdown } from "@components/TopRight";
import styles from "@styles";

export default function TopRight({ content }) {
    const { user } = useUser();

    return (
        <div className={styles.topRight.container}>
            {content.includes("tokens") && <TokenBalance />}

            {user && <UserDropdown />}
        </div>
    )
}
