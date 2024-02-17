import { useEffect } from "react";
import { Textfit } from "react-textfit";
import { blooks } from "@stores/BlookStore";
import { rarities } from "@stores/RarityStore";
import styles from "@styles";

export default function RightBlook({ blook, owned, noBlooksOwned }) {
    if (noBlooksOwned) return (
        <div className={styles.blooks.rightSide}>
            <div className={styles.blooks.rightNoBlooksOwned}>
                You don't own any blooks.
            </div>
        </div>
    )

    useEffect(() => {
        if (!blooks.find(b => b.id === blook)) throw new Error(`blook ${blook} does not exist`);
    }, []);

    return (
        <div className={styles.blooks.rightSide}>
            <img src={blooks.find(b => b.id === blook).background || "/content/blooks/backgrounds/Default.png"} alt="Blook Background" draggable={false} className={styles.blooks.rightBlookBackground} />
            <div className={styles.blooks.rightTopText}>
                <Textfit mode="single" max={window.innerWidth > 1000 ? 40 : 27} className={styles.blooks.rightBlookName}>{blooks.find(b => b.id === blook).name}</Textfit>
                <div style={{
                    color: rarities.find(r => r.id === blooks.find(b => b.id === blook).rarity).color
                }} className={styles.blooks.rightBlookRarity}>{rarities.find(r => r.id === blooks.find(b => b.id === blook).rarity).name}</div>
            </div>

            <div className={styles.blooks.rightBlookImage}>
                <img src={blooks.find(b => b.id === blook).image || "/content/blooks/Error.png"} alt={blooks.find(b => b.id === blook).name} />
            </div>

            <div className={styles.blooks.rightBottomText}>{owned.toLocaleString() || 0} Owned</div>
            <div className={styles.blooks.rightShadow} />
        </div>
    )
}