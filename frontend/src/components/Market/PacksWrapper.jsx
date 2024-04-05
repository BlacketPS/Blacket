import styles from "@styles";

/**
 * The pack wrapper component.
 * @param {Object} props The properties for this component.
 * @param {Object} props.children The children of the component.
 * @returns {JSX.Element} The packs wrapper component.
 */
export default function PacksWrapper({ children }) {
    return <div className={styles.market.packsWrapper}>{children}</div>;
}