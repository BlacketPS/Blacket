import styles from "@styles/index";

export default function Modal({ children }) {
    return (
        <div className={styles.all.modal}>
            {children}
        </div>
    )
}