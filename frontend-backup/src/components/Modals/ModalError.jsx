import styles from "@styles";

export default function ModalError({ children }) {
    return (
        <div className={styles.all.errorContainer}>
            <i className="fas fa-times-circle" />
            <div>{children}</div>
        </div>
    )
}