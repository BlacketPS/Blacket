import styles from "@styles";

export default function GenericModal({ closing, children }) {
    return (
        <div data-closing={closing} className={styles.modal.modal}>
            <div data-closing={closing} className={styles.modal.modalContent}>
                <div className={styles.modal.modalContainer}>
                    {children}
                </div>
            </div>
        </div>
    )
}