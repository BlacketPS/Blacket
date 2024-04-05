import styles from "@styles";

/**
 * The generic button component.
 * @param {Object} props The properties for this component.
 * @param {string} props.className The class name of the button.
 * @param {string} props.backgroundColor The background color of the button.
 * @param {Object} props.children The children of the component.
 * @param {Object} props.props The remaining properties for the button.
 * @returns {JSX.Element} The generic button component.
 */
export default function GenericButton({ className, backgroundColor, children, ...props }) {
    // If the class name is not provided, set it to an empty string. Otherwise, add a space before the class name so it is separated from the other classes.
    if (!className) className = "";
    else className = ` ${className}`;

    return (
        <div className={`${styles.buttons.button}${className}`} role="button" {...props}>
            <div className={styles.buttons.buttonShadow} />
            <div style={{ backgroundColor: backgroundColor && backgroundColor }} className={styles.buttons.buttonEdge} />
            <div style={{ backgroundColor: backgroundColor && backgroundColor }} className={styles.buttons.buttonInside}>{children}</div>
        </div>
    )
}