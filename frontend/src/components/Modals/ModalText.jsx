import styles from "@styles";

export default function ModalBody({ children, ...props }) {
    return <div className={styles.modal.text} {...props}>{children}</div>;
}