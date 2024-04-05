import styles from "@styles";

/**
 * The header body component.
 * @param {Object} props The properties for this component.
 * @param {Object} props.children The children of the component.
 * @returns {JSX.Element} The header body component.
 */
export default function HeaderBody({ children }) {
    return <div className={styles.all.headerBody}>{children}</div>;
}