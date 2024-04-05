import styles from "@styles";

/**
 * A generc modal of no specific type.
 * @param {Object} props The properties for this component.
 * @param {Boolean} props.closing Whether the modal is closing.
 * @param {Boolean} props.noAnimation Whether the modal should animate.
 * @param {Object} props.children The children of the component.
 * @returns {JSX.Element} The generic modal component.
 */
export default function GenericModal({ closing, noAnimation, children }) {
    return (
        <div data-closing={closing} data-animated={noAnimation ? false : true} className={styles.modal.modal}>
            <div data-closing={closing} data-animated={noAnimation ? false : true} className={styles.modal.content}>
                <div className={styles.modal.container}>
                    {children}
                </div>
            </div>
        </div>
    )
}