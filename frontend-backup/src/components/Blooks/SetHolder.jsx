import styles from "@styles";

export default function SetHolder({ name, children }) {
    return (
        <div className={styles.blooks.setHolder}>
            <div className={styles.blooks.setTop}>
                <div className={styles.blooks.setTopBackground} />
                <div className={styles.blooks.setTopText}>{name}</div>
                <div className={styles.blooks.setTopDivider} />
            </div>
            <div className={styles.blooks.setItems}>
                {children}
            </div>
        </div>
    )
}