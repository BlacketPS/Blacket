import { useState } from "react";
import { useUser } from "@stores/UserStore";
import { useCategories } from "@controllers/settings";
import styles from "@styles";

export default function Category({ header, internalName, children }) {
    const { user } = useUser();

    const [openedState, setOpenedState] = useState(user.settings.categoriesClosed.includes(internalName) ? false : true);

    const setCategoryState = useCategories();

    const toggleOpenedState = () => {
        setCategoryState(openedState, internalName);
        setOpenedState(!openedState);
    }

    return (<>
        <div className={styles.market.categoryHeader} onClick={toggleOpenedState}>
            {header}
            <i className={`${styles.market.categoryArrow} fas fa-square-chevron-right`} aria-open={openedState} />
        </div>
        <div className={styles.market.categoryContent} aria-open={openedState}>{children}</div>
    </>)
}