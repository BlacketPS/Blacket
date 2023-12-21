import styles from "@styles";

export default function Modal({ children }) {
    return (
        <div className={styles.all.modal}>
            <div className={styles.all.modalContent}>
                {children}
            </div>
        </div>
    )
}