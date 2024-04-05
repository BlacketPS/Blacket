import styles from "@styles";

/**
 * The sidebar body component.
 * @param {Object} props The properties for this component.
 * @param {Object} props.children The children of the component.
 * @returns {JSX.Element} The sidebar body component.
 */
export default function SidebarBody({ children }) {
    return <div className={styles.all.sidebarBody}>{children}</div>;
}