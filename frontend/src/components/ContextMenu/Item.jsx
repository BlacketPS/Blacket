import styles from "@styles";

/**
 * The context menu item component.
 * @param {Object} props The properties for this component.
 * @param {string} props.icon The icon for the item.
 * @param {string} props.color The color of the item.
 * @param {Object} props.children The children of the component.
 * @param {Function} props.onClick The function to call when the item is clicked.
 * @returns {JSX.Element} The context menu item component.
 */
export default function Item({ icon, color, children, onClick }) {
    return (
        <div className={styles.contextMenu.item} style={{ color }} onClick={onClick}>
            <span>{children}</span>
            <i className={icon} />
        </div>
    )
}