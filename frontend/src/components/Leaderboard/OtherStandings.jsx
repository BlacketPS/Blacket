import styles from "@styles";

/**
 * The other standings component.
 * @param {Object} props The properties for this component.
 * @param {Object} props.children The children of the component.
 * @returns {JSX.Element} The other standings component.
 */
export default function OtherStandings({ children }) {
    return <div className={styles.leaderboard.otherStandings}>{children}</div>;
}