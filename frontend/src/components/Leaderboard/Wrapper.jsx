import styles from "@styles";

export default function Wrapper({ children }) {
    return <div className={styles.leaderboard.wrapper}>{children}</div>
}