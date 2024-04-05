import { useEffect } from "react";
import styles from "@styles";

/**
 * A settings container component.
 * @param {Object} props The properties for this component.
 * @param {Object} props.header The header object.
 * @param {string} props.header.icon The header icon.
 * @param {string} props.header.text The header text.
 * @param {Object} props.children The children of the component.
 * @returns {JSX.Element} The settings container component.
 */
export default function SettingsContainer({ header, children }) {
    useEffect(() => {
        // Validate the header is an object and has icon and text properties.
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