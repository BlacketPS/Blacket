import styles from "@styles";

/**
 * The other top three component.
 * @param {Object} props The properties for this component.
 * @param {Object} props.children The children of the component.
 * @returns {JSX.Element} The other top three component.
 */
export default function OtherTopThree({ children }) {
    return <div className={styles.leaderboard.otherTopThreeStandings}>{children}</div>
}