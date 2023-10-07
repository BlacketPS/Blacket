import styles from "@styles";

export default function Background({ color, opacity }) {
    return (
        <div className={styles.all.background} style={{ background: color || "#4f4f4f" }}>
            <div className={styles.all.blooksBackground} style={{ opacity: opacity || 0.1 }} />
        </div>
    )
}