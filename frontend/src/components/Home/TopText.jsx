import styles from "@styles";

export default function TopText() {
    return (
        <div className={styles.home.topHeaderContainer}>
            <div className={styles.home.logoText}>{import.meta.env.VITE_INFORMATION_NAME}</div>
        </div>
    )
}