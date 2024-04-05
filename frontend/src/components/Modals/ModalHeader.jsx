import styles from "@styles";

/**
 * The modal header component.
 * @param {Object} props The properties for this component.
 * @param {Object} props.children The children of the component.
 * @returns {JSX.Element} The modal header component.
 */
export default function ModalHeader({ children }) {
    return (<>
        <div className={styles.modal.header}>{children}</div>
        <div className={styles.modal.divider} />
    </>)
}