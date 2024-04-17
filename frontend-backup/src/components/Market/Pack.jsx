import styles from "@styles";

export default function Pack({ image, innerColor, outerColor, price, onClick }) {
    return (
        <div className={styles.market.packContainer} style={{ background: `radial-gradient(circle, ${innerColor} 0%, ${outerColor} 100%)` }} onClick={onClick}>
            <div className={styles.market.packImageContainer}>
                <img className={styles.market.packShadow} src={image} />
                <img className={styles.market.packImage} src={image} />
            </div>

            <div className={styles.market.packBottom}>
                <img src="/content/token.png" />
                {price}
            </div>
        </div>
    )
}