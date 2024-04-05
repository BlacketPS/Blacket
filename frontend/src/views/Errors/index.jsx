/**
 * @file Shows an error page when an error occurs.
 */

import styles from "@styles";

import { Background, HeaderNoLink } from "@components";

/**
 * The error page view.
 * 
 * @param {Object} props The properties of the component.
 * @param {Number} props.code The error code.
 * @param {String} props.reason The reason for the error.
 * 
 * @returns {JSX.Element} The error page view.
 */
export default function Error({ code, reason }) {
    // Set the document title based on the error code
    if (code === null) document.title = `Error | ${import.meta.env.VITE_INFORMATION_NAME}`;
    else if (code === 404) document.title = `Not Found | ${import.meta.env.VITE_INFORMATION_NAME}`;
    else if (code === 403) document.title = `Blacklisted | ${import.meta.env.VITE_INFORMATION_NAME}`;
    else if (code === 502) {
        document.title = `Maintenance | ${import.meta.env.VITE_INFORMATION_NAME}`;
        setInterval(() => fetch.get("/api").then(() => window.location.reload()).catch(() => null), 1000);
    }

    return (
        <>
            {code !== 404 && <><Background /><HeaderNoLink /></>}

            <div className={styles.errors.body}>
                <div className={styles.errors.container}>
                    <div className={styles.errors.top}>
                        {code === 502 ? "Oops!" : code === 403 ? "Uh oh..." : typeof code !== "number" ? "Something went wrong" : ""}
                    </div>

                    <img className={styles.errors.image} src={typeof code === "number" ? `/content/${code}.png` : `/content/error.png`} draggable={false} />

                    <div className={styles.errors.bottom}>
                        {code === 502 ? <>
                            It looks like our servers are having some troubles at the moment. <br /> Please come back at a later time while we fix this.
                        </> : code === 403 ? <>
                            It looks like you have been blacklisted for {reason}.
                        </> : typeof code !== "number" ? <>
                            {code.error || code.componentStack || "Sorry, an unexpected error has occurred."}
                        </> : <>
                            We tried our best looking for what you requested <br /> but we couldn't find anything!
                        </>}
                    </div>
                </div>
            </div>
        </>
    )
}
