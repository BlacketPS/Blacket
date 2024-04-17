import styles from "@styles";

export default function Input({ icon, ...props }) {
    return (
        <div className={styles.all.inputContainer}>
            {icon && <i className={icon} />}
            <input data-icon={icon ? true : false} {...props} />
        </div>
    )
}