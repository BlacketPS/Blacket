import { useState } from "react";
import { useUser } from "@stores/UserStore";
import { useClosedCategories } from "@controllers/settings";
import styles from "@styles";

/**
 * A category component for the market.
 * @param {Object} props The properties for this component.
 * @param {Object} props.header The header object.
 * @param {string} props.header.icon The header icon.
 * @param {string} props.header.text The header text.
 * @param {string} props.internalName The internal name of the category.
 * @param {Object} props.children The children of the component.
 * @returns {JSX.Element} The category component.
 */
export default function Category({ header, internalName, children }) {
    // Get the user from the user store.
    const { user } = useUser();

    // Get/set the opened state of the category.
    const [openedState, setOpenedState] = useState(user.settings.categoriesClosed.includes(internalName) ? false : true);

    // Get the set closed category function.
    const setClosedCategory = useClosedCategories();

    // Toggle the opened state of the category.
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