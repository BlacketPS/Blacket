import styles from "@styles";

export default function BlooksHolder({ children }) {
    return (
        <div className={styles.blooks.leftSide}>
            <div className={styles.blooks.blooksHolder}>
                {children}
            </div>
        </div>
    )
}