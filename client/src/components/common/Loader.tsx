import styles from "@styles/index";

export default function Loader() {
    return (
        <div className={styles.all.loaderModal}>
            <div className={styles.all.loader}>
                <div className={`${styles.all.blookContainerLoader} ${styles.all.loaderBox}`}>
                    <img loading="lazy" src="/content/logo.png" className={styles.all.loaderBlook} alt="Blook"/>
                </div>
                <div className={styles.all.shadow} />
            </div>
        </div>
    )
}