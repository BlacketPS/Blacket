import styles from "@styles";

export default function ClearButton({ className, children, ...props }) {
    return <div className={`${styles.buttons.clearButton} ${className}`} {...props}>{children}</div>;
}