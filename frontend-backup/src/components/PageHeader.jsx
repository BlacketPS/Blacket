import styles from "@styles";

export default function PageHeader({ children, ...props }) {
    return <div className={styles.all.pageHeader} {...props}>{children}</div>
}