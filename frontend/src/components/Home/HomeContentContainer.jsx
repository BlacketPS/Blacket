import styles from "@styles";

export default function HomeContentContainer({ children }) {
    return <div className={styles.home.headerContainer}>{children}</div>;
}