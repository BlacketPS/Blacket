import styles from "@styles";

export default function Item({ icon, color, children, onClick }) {
    return (
        <div className={styles.contextMenu.item} style={{ color }} onClick={onClick}>
            <span>{children}</span>
            <i className={icon} />
        </div>
    )
}