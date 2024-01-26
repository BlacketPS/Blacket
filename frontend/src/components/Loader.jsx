import styles from "@styles";

export default function Loader({ image, message }) {
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