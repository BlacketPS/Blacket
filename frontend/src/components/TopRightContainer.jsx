import { useUser } from "@stores/UserStore";
import { TokenBalance, UserDropdown } from "@components/TopRight";
import styles from "@styles";

/**
 * The top right container component.
 * @param {Object} props The properties for this component.
 * @param {String} props.content The content to display.
 * @returns {JSX.Element} The top right container component.
 */
export default function TopRight({ content }) {
    // Get the user from the user store.
    const { user } = useUser();

    return (
        <div className={styles.topRight.container}>
            {content.includes("tokens") && <TokenBalance />}

            {user && <UserDropdown />}
        </div>
    )
}
