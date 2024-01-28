import styles from "@styles";

export default function GenericModal({ closing, children }) {
    return (
        <div data-closing={closing} className={styles.modal.modal}>
            <div data-closing={closing} className={styles.modal.content}>
                <div className={styles.modal.container}>
                    {children}
                </div>
            </div>
        </div>
    )
}