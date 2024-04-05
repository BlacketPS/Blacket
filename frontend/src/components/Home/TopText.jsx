import styles from "@styles";

/**
 * The top text component.
 * @returns {JSX.Element} The top text component.
 */
export default function TopText() {
    return (
        <div className={styles.home.topHeaderContainer}>
            <div className={styles.home.logoText}>{import.meta.env.VITE_INFORMATION_NAME}</div>
        </div>
    )
}