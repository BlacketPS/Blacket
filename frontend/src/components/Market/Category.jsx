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
            <img src="/content/arrow.png" className={styles.market.categoryArrow} draggable={false} data-opened={openedState} />
        </div>
        <div className={styles.market.categoryContent} data-opened={openedState}>{children}</div>
    </>)
}