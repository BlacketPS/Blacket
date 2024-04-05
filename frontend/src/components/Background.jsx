import styles from "@styles";

/**
 * The background component.
 * @param {Object} props The properties for this component.
 * @param {String} props.color The color of the background.
 * @param {String} props.opacity The opacity of the background.
 * @returns {JSX.Element} The background component.
 */
export default function Background({ color, opacity }) {
    return (
        <div className={styles.all.background} style={{ background: color || "var(--background-color)" }}>
            <div className={styles.all.backgroundBlooks} style={{ opacity: opacity || "var(--background-opacity)" }} />
        </div>
    )
}