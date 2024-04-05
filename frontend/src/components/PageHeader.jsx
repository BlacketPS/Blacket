import styles from "@styles";

/**
 * The page header component.
 * @param {Object} props The properties for this component.
 * @param {Object} props.children The children of the component.
 * @param {Object} props.props The remaining properties for the component.
 * @returns {JSX.Element} The page header component.
 */
export default function PageHeader({ children, ...props }) {
    return <div className={styles.all.pageHeader} {...props}>{children}</div>
}