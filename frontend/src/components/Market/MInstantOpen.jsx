import styles from "@styles";

export default function MInstantOpen({ instantOpen, setInstantOpen }) {
    return (
        <div className={styles.market.flex}>
            <div className={styles.market.mInstantButton} role="button" tabIndex={0} onClick={() => setInstantOpen(!instantOpen)}>
                Instant Open: {instantOpen ? "On" : "Off"}
            </div>
        </div>
    )
}