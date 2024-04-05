import styles from "@styles";

/**
 * The modal body component.
 * @param {Object} props The properties for this component.
 * @param {Object} props.children The children of the component.
 * @param {Object} props.props The remaining properties for the component.
 * @returns {JSX.Element} The modal body component.
 */
export default function ModalBody({ children, ...props }) {
    return <div className={styles.modal.text} {...props}>{children}</div>;
}