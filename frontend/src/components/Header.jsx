import { useEffect } from "react";
import { Link } from "react-router-dom";
import { config } from "@stores/config";
import styles from "@styles";

export default function Header({ right }) {
    useEffect(() => {
        if (right && typeof right !== "object") throw new Error("header right must be typeof object");
        if (right && !right.link || !right.text) throw new Error("header right must have link and text");
    }, []);

    return (
        <>
            <div className={styles.all.header}>
                <Link className={styles.all.headerLeft} to="/">{config.name}</Link>
                {right && <Link className={styles.all.headerRight} to={right.link}>{right.text}</Link>}
            </div>
        </>
    )
}