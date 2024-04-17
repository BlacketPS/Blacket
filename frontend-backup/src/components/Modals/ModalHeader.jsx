import styles from "@styles";

export default function ModalHeader({ children }) {
    return (<>
        <div className={styles.modal.header}>{children}</div>
        <div className={styles.modal.divider} />
    </>)
}