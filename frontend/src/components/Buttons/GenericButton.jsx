import styles from "@styles";

export default function GenericButton({ className, children, ...props }) {
    if (!className) className = "";
    else className = ` ${className}`;

    return (
        <div className={`${styles.buttons.button}${className}`} role="button" {...props}>
            <div className={styles.buttons.buttonShadow} />
            <div className={styles.buttons.buttonEdge} />
            <div className={styles.buttons.buttonInside}>{children}</div>
        </div>
    )
}