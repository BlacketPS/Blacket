import styles from "@styles";

/**
 * The pack component.
 * @param {Object} props The properties for this component.
 * @param {string} props.image The image of the pack.
 * @param {string} props.innerColor The inner color of the pack.
 * @param {string} props.outerColor The outer color of the pack.
 * @param {string} props.price The price of the pack.
 * @param {Function} props.onClick The on click function.
 * @returns {JSX.Element} The pack component.
 */
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