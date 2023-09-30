import styles from "@styles/index";

export default function Loader({ style, message }) {
    if (message) style = { ...style, marginBottom: "50px" }

    return (
        <>
            <div className={styles.all.loader} style={style}>
                <div className={styles.all.loaderShadow} />
                <img className={styles.all.loaderBlook} src="/content/blooks/Console.gif" draggable={false} />
            </div>
            <div className={styles.all.loaderMessage}>{message}</div>
        </>
    );
}