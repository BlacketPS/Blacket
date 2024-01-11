import { useEffect } from "react";
import styles from "@styles";

export default function Input({ icon, ...props }) {
    useEffect(() => {
        if (!icon) throw new Error("input icon is required");
        if (typeof icon !== "string") throw new Error("input icon must be typeof string");
    }, []);

    return (
        <div className={styles.authentication.inputContainer}>
            <i className={`${icon} ${styles.authentication.icon}`} />
            <input className={styles.authentication.input} {...props} />
        </div>
    )
}