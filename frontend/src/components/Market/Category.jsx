import { useState } from "react";
import styles from "@styles";

export default function Category({ opened, header, children }) {
    const [openedState, setOpenedState] = useState(opened ? opened : true);

    return (<>
        <div className={styles.market.categoryHeader} onClick={() => setOpenedState(!openedState)}>
            {header}
            <i className={`${styles.market.categoryArrow} fas fa-square-chevron-right`} aria-open={openedState} />
        </div>
        <div className={styles.market.categoryContent} aria-open={openedState}>{children}</div>
    </>)
}