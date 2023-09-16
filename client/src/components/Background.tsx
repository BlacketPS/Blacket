import styles from "@styles/index"

export default function Background() {
    return (
        <div className={styles.all.background}>
            <div className={styles.all.blooksBackground} style={{ backgroundImage: "url('/content/background.png')" }}></div>
        </div>
    )
}