import styles from "@styles";

/**
 * The header container component.
 * @param {Object} props The properties for this component.
 * @param {Object} props.children The children of the component.
 * @returns {JSX.Element} The header container component.
 */
export default function HeaderContainer({ children }) {
    return <div className={styles.home.headerContainer}>{children}</div>;
}