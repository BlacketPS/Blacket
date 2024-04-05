import styles from "@styles";

/**
 * The loader component.
 * @param {Object} props The properties for this component.
 * @param {String} props.image The image for the loader.
 * @param {String} props.message The message for the loader.
 * @returns {JSX.Element} The loader component.
 */
export default function Loader({ image, message }) {
    // If the image is not provided, use the default image.
    if (!image) image = "/content/blooks/Default.png";

    return (
        <div className={styles.all.loadingModal}>
            <div className={styles.all.loader} style={message ? { marginBottom: "50px" } : null}>
                <div className={styles.all.loaderShadow} />
                <img className={styles.all.loaderBlook} src={image} draggable={false} />
            </div>
            {message && <div className={styles.all.loaderMessage}>{message}</div>}
        </div>
    )
}