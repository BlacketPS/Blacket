import styles from "@styles";

export default function Container({children}) {
    return <div className={styles.settings.container}>{children}</div>;
}