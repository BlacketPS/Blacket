import styles from "@styles";

export default function Error({ error }) {
    return (
        <div className={styles.authentication.errorContainer}>
            <i className={`fas fa-times-circle ${styles.authentication.errorIcon}`} />
            <div className={styles.authentication.errorText}>{error}</div>
        </div>
    )
}