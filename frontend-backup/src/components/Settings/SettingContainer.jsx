import { useEffect } from "react";
import styles from "@styles";

export default function SettingsContainer({ header, children }) {
    useEffect(() => {
        if (header && typeof header !== "object") throw new Error("header must be typeof object");
        if (header && (!header.icon || !header.text)) throw new Error("header must have icon and text");
    }, []);

    return (
        <div className={styles.settings.settingsContainer}>
            <div className={styles.settings.settingsContainerHeader}>
                <i className={header.icon} />
                <div>{header.text}</div>
            </div>

            <div className={styles.settings.settingsContainerDivider} />

            {children}
        </div>
    )
}