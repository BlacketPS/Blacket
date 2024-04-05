import styles from "@styles";


/**
 * The error modal component.
 * @param {Object} props The properties for this component.
 * @param {Object} props.children The children of the component.
 * @returns {JSX.Element} The error modal component.
 */
export default function ModalError({ children }) {
    return (
        <div className={styles.all.errorContainer}>
            <i className="fas fa-times-circle" />
            <div>{children}</div>
        </div>
    )
}