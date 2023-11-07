import { useEffect } from "react";
import styles from "@styles";

export default function Input({ icon, placeholder, type, autoComplete, maxLength, ...props }) {
    useEffect(() => {
        if (!icon) throw new Error("input icon is required");
        if (!type) throw new Error("input type is required");
        if (!maxLength) maxLength = Infinity;
        if (typeof icon !== "string") throw new Error("input icon must be typeof string");
        if (typeof placeholder !== "string") throw new Error("input placeholder must be typeof string");
        if (typeof type !== "string") throw new Error("input type must be typeof string");
        if (typeof autoComplete !== "string") throw new Error("input autoComplete must be typeof string");
        if (typeof maxLength !== "number") throw new Error("input maxLength must be typeof number");
    }, []);

    return (
        <>
            <div className={styles.authentication.inputContainer}>
                <i className={`${icon} ${styles.authentication.icon}`} />
                <input className={styles.authentication.input} placeholder={placeholder} type={type} autoComplete={autoComplete} maxLength={maxLength} {...props} />
            </div>
        </>
    )
}