import { blooks } from "@stores/BlookStore";
import { rarities } from "@stores/RarityStore";
import styles from "@styles";

export default function Blook({ blook, locked, quantity, ...props }) {
    return (
        <div data-locked={locked} className={styles.blooks.blook} {...props}>
            <img src={blooks.find(b => b.id === blook).image || "/content/blooks/Error.png"} data-locked={locked} alt={blooks.find(b => b.id === blook).name} draggable={false} />
            {!locked && <div style={{
                backgroundColor: rarities.find(r => r.id === blooks.find(b => b.id === blook).rarity).color
            }} className={styles.blooks.blookQuantity}>{quantity.toLocaleString()}</div>}

            {locked && <i className={`fas fa-lock ${styles.blooks.blookLock}`} />}
        </div>
    )
}