import styles from "@styles";

export default function ModalBody({ children }) {
    return <div className={styles.modal.text}>{children}</div>;
}