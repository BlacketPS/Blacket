import styles from "@styles";

export default function Header({ children }) {
    return <div className={styles.authentication.containerHeader}>{children}</div>
}