import styles from "@styles/index"

export default function Background({ color, opacity }: { color?: string, opacity?: number }) {
    return (
        <div className={styles.all.background} style={{ background: color ? color : "#4f4f4f" }}>
            <div className={styles.all.blooksBackground} style={{ opacity: opacity ? opacity : 0.1 }} />
        </div>
    )
}