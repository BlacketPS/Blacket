import styles from "@styles";

export default function Input({ icon, ...props }) {
    return (
        <div className={styles.all.inputContainer}>
            {icon && <i className={icon} />}
            <input style={{ width: !icon ? "92.5%" : null }} {...props} />
        </div>
    )
}