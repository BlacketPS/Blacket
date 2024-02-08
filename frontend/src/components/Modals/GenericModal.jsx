import styles from "@styles";

export default function GenericModal({ closing, noAnimation, children }) {
    return (
        <div data-closing={closing} data-animated={noAnimation ? false : true} className={styles.modal.modal}>
            <div data-closing={closing} data-animated={noAnimation ? false : true} className={styles.modal.content}>
                <div className={styles.modal.container}>
                    {children}
                </div>
            </div>
        </div>
    )
}