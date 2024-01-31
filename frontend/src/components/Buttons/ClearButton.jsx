import styles from "@styles";

export default function ClearButton({ className, children, ...props }) {
    if (!className) className = "";
    else className = ` ${className}`;

    return <div className={`${styles.buttons.clearButton}${className}`} role="button" {...props}>{children}</div>;
}