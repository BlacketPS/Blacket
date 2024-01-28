import { useEffect } from "react";
import styles from "@styles";

export default function Input({ icon, ...props }) {
    useEffect(() => {
        if (!icon) throw new Error("input icon is required");
        if (typeof icon !== "string") throw new Error("input icon must be typeof string");
    }, []);

    return (
        <div className={styles.all.inputContainer}>
            <i className={icon} />
            <input {...props} />
        </div>
    )
}