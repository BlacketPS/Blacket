import styles from "@styles";

export default function LittleButton({ className, children, ...props }) {
    if (!className) className = "";
    else className = ` ${className}`;

    return <div className={`${styles.buttons.littleButton}${className}`} role="button" {...props}>{children}</div>;
}