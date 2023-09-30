import styles from "@styles/index";
import Background from "@components/Background";

export default function Error({ code, reason }) {
    if (code === 502) document.title = "Maintenance";
    else if (code === 403) document.title = "Blacklisted";
    else document.title = "Not Found";

    return (
        <>
            <Background color="#4f4f4f" opacity={0.1} />

            <div className={styles.errors.body}>
                <div className={styles.errors.container}>
                    <div className={styles.errors.top}>{code === 502 ? "Oops!" : code === 403 ? "Uh oh..." : ""}</div>
                    <img className={styles.errors.image} src={`/content/${code === 502 ? 502 : code === 403 ? 403 : 404}.png`} draggable={false} />
                    <div className={styles.errors.bottom}>
                        {
                            code === 502 ? <>
                                It looks like our servers are having some troubles at the moment. <br /> Please come back at a later time while our Blooks fix this.
                            </> : code === 403 ? <>
                                It looks like you have been blacklisted for {reason}.
                            </> : <>
                                We tried our best looking for what you requested <br /> but our Blooks couldn't find anything!
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}