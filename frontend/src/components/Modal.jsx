import styles from "@styles";

export default function Modal({ children }) {
    return (
        <div className={styles.all.modal}>
            {children}
        </div>
    )
}