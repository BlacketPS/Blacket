import styles from "@styles";

export default function GenericButton({ className, backgroundColor, children, ...props }) {
    if (!className) className = "";
    else className = ` ${className}`;

    return (
        <div className={`${styles.buttons.button}${className}`} role="button" {...props}>
            <div className={styles.buttons.buttonShadow} />
            <div style={{ backgroundColor: backgroundColor && backgroundColor }} className={styles.buttons.buttonEdge} />
            <div style={{ backgroundColor: backgroundColor && backgroundColor }} className={styles.buttons.buttonInside}>{children}</div>
        </div>
    )
}