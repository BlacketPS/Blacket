import { useState } from "react";
import { useUser } from "@stores/UserStore";
import { useClosedCategories } from "@controllers/settings";
import styles from "@styles";

export default function Category({ header, internalName, children }) {
    const { user } = useUser();

    const [openedState, setOpenedState] = useState(user.settings.categoriesClosed.includes(internalName) ? false : true);

    const setClosedCategory = useClosedCategories();

    const toggleOpenedState = () => {
        setClosedCategory(openedState, internalName);
        setOpenedState(!openedState);
    }

    return (<>
        <div className={styles.market.categoryHeader} onClick={toggleOpenedState}>
            {header}
            <span className={styles.market.categoryArrow} aria-open={openedState}>{"\u25B6"}</span>
        </div>
        <div className={styles.market.categoryContent} aria-open={openedState}>{children}</div>
    </>)
}