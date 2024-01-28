import styles from "@styles";

export default function ErrorContainer({ children }) {
    return (
        <div className={styles.all.errorContainer}>
            <i className="fas fa-times-circle" />
            <div>{children}</div>
        </div>
    )
}