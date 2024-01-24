import styles from "@styles";

export default function FilterButton({ children, ...props }) {
    return <div className={styles.leaderboard.filterButton} {...props}>Sorting By: {children}</div>
}