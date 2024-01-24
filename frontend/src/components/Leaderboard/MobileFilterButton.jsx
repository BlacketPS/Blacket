import styles from "@styles";

export default function MobileFilterButton({ children, ...props }) {
    return <div className={styles.leaderboard.mobileFilterButton} {...props}>Sorting By: {children}</div>
}