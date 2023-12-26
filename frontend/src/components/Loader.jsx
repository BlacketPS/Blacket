import styles from "@styles";

export default function Loader({ style, image, message }) {
    if (message) style = { ...style, marginBottom: "50px" }
    if (!image) image = "/content/blooks/Default.png";

    return (
        <>
            <div className={styles.all.loadingModal}>
                <div className={styles.all.loader} style={style}>
                    <div className={styles.all.loaderShadow} />
                    <img className={styles.all.loaderBlook} src={image} draggable={false} />
                </div>
                {message && <div className={styles.all.loaderMessage}>{message}</div>}
            </div>
        </>
    );
}