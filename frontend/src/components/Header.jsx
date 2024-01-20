import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "@styles";

export function Header({ right }) {
    useEffect(() => {
        if (right && typeof right !== "object") throw new Error("header right must be typeof object");
        if (right && (!right.link || !right.text)) throw new Error("header right must have link and text");
    }, []);

    return (
        <div className={styles.all.header}>
            <Link className={styles.all.headerLeft} to="/">{import.meta.env.VITE_INFORMATION_NAME}</Link>
            {right && <Link className={styles.all.headerRight} to={right.link}>{right.text}</Link>}
        </div>
    )
}

export function HeaderNoLink() {
    return (
        <div className={styles.all.header}>
            <div className={styles.all.headerLeft}>{import.meta.env.VITE_INFORMATION_NAME}</div>
        </div>
    )
}

export default { Header, HeaderNoLink }