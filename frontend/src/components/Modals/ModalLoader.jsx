import styles from "@styles";

/**
 * The modal loader component.
 * @returns {JSX.Element} The modal loader component.
 */
export default function ModalLoader() {
    return (
        <div className={`${styles.all.loader} ${styles.modal.loader}`}>
            <div className={styles.all.loaderShadow} />
            <img className={styles.all.loaderBlook} src="/content/blooks/Default.png" draggable={false} />
        </div>
    )
}