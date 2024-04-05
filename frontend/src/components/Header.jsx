import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "@styles";

/**
 * The header component.
 * @param {Object} props The properties for this component.
 * @param {Object} props.right The right side of the header.
 * @returns {JSX.Element} The header component.
 */
export function Header({ right }) {
    useEffect(() => {
        // Check if the right property is an object and has the correct properties.
        if (right && typeof right !== "object") throw new Error("right must be typeof object");
        if (right && (!right.link || !right.text)) throw new Error("right must have link and text");
    }, []);

    return (
        <div className={styles.all.header}>
            <Link className={styles.all.headerLeft} to="/">{import.meta.env.VITE_INFORMATION_NAME}</Link>
            {right && <Link className={styles.all.headerRight} to={right.link}>{right.text}</Link>}
        </div>
    )
}

/**
 * The header component without a link.
 * @returns {JSX.Element} The header component without a link.
 */
export function HeaderNoLink() {
    return (
        <div className={styles.all.header}>
            <div className={styles.all.headerLeft}>{import.meta.env.VITE_INFORMATION_NAME}</div>
        </div>
    )
}

export default { Header, HeaderNoLink }