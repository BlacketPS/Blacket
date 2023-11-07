import { useEffect } from "react";
import axios from "axios";
import styles from "@styles";
import Background from "@components/Background";

export default function Error({ code, reason }) {
    if (code === 502) document.title = "Maintenance";
    else if (code === 403) document.title = "Blacklisted";
    else if (typeof code === "number") document.title = "Not Found";
    else document.title = code.error;

    const alertError = () => alert(`${code.error}${code.componentStack}`);

    if (code === 502) useEffect(() => setInterval(() => axios.get("/api").then(res => res.status === 200 && window.location.reload()), 1000), []);
    else if (typeof code !== "number") useEffect(() => alertError(), []);

    return (
        <>
            <Background />

            <div className={styles.errors.body}>
                <div className={styles.errors.container}>
                    <div className={styles.errors.top}>{
                        code === 502 ? "Oops!" : code === 403 ? "Uh oh..." : typeof code !== "number" ? "Something went wrong" : ""
                    }</div>
                    <img className={styles.errors.image} src={
                        typeof code === "number" ? `/content/${code}.png` : `/content/error.png`
                    } draggable={false} />

                    <div className={styles.errors.bottom}>
                        {
                            code === 502 ? <>
                                It looks like our servers are having some troubles at the moment. <br /> Please come back at a later time while we fix this.
                            </> : code === 403 ? <>
                                It looks like you have been blacklisted for {reason}.
                            </> : typeof code !== "number" ? <>
                                <div className={styles.errors.button} onClick={() => alertError()}>
                                    {code.error}
                                </div>
                            </> : <>
                                We tried our best looking for what you requested <br /> but we couldn't find anything!
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}