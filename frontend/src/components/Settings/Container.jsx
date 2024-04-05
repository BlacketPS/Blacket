import styles from "@styles";

/**
 * A container component.
 * @param {Object} props The properties for this component.
 * @param {Object} props.children The children of the component.
 * @returns {JSX.Element} The container component.
 */
export default function Container({children}) {
    return <div className={styles.settings.container}>{children}</div>;
}