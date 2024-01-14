import styles from "@styles";

export default function Version() {
    return <div className={styles.home.versionInformation}>Running Blacket v{import.meta.env.VITE_INFORMATION_VERSION}</div>;
}