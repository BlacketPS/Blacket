import styles from "@styles";

export default function Item({ icon, children, onClick }) {
    return (
        <div className={styles.contextMenu.item} onClick={onClick}>
            <span>{children}</span>
            <i className={icon} />
        </div>
    )
}