import styles from "@styles";

/**
 * The input component.
 * @param {Object} props The properties for this component.
 * @param {String} props.icon The icon for the input.
 * @returns {JSX.Element} The input component.
 */
export default function Input({ icon, ...props }) {
    return (
        <div className={styles.all.inputContainer}>
            {icon && <i className={icon} />}
            <input data-icon={icon ? true : false} {...props} />
        </div>
    )
}