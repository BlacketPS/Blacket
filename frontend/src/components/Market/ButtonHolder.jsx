import styles from "@styles";

/**
 * The button holder component.
 * @param {Object} props The properties for this component.
 * @param {Object} props.children The children of the component.
 * @returns {JSX.Element} The button holder component.
 */
export default function ButtonHolder({ children }) {
    return <div className={styles.market.buttonHolder}>{children}</div>;
}