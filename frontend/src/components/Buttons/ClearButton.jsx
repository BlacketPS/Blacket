import styles from "@styles";

/**
 * The clear button component.
 * @param {Object} props The properties for this component.
 * @param {string} props.className The class name of the button.
 * @param {Object} props.children The children of the component.
 * @param {Object} props.props The remaining properties for the button.
 * @returns {JSX.Element} The clear button component.
 */
export default function ClearButton({ className, children, ...props }) {
    // If the class name is not provided, set it to an empty string. Otherwise, add a space before the class name so it is separated from the other classes.
    if (!className) className = "";
    else className = ` ${className}`;

    return <div className={`${styles.buttons.clearButton}${className}`} role="button" {...props}>{children}</div>;
}