import styles from "@styles";

/**
 * The leaderboard wrapper component.
 * @param {Object} props The properties for this component.
 * @param {Object} props.children The children of the component.
 * @returns {JSX.Element} The leaderboard wrapper component.
 */
export default function Wrapper({ children }) {
    return <div className={styles.leaderboard.wrapper}>{children}</div>
}