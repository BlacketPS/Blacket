import styles from "@styles";

/**
 * The version component.
 * @returns {JSX.Element} The version component.
 */
export default function Version() {
    return <div className={styles.home.versionInformation}>Running Blacket v{import.meta.env.VITE_INFORMATION_VERSION}</div>;
}