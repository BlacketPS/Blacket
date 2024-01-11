import styles from "@styles";

export default function SubmitButton({ children, ...props }) {
    return <div className={styles.authentication.button} {...props}>{children}</div>
}