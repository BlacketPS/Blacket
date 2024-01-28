import styles from "@styles";

export default function ModalHeader({ children }) {
    return (<>
        <div className={styles.modal.modalHeader}>{children}</div>
        <div className={styles.modal.modalDivider} />
    </>)
}