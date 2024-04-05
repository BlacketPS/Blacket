import { useUser } from "@stores/UserStore";

/**
 * The hook that handles setting closed categories.
 * @returns {Function} The function to set closed categories.
 */
const useClosedCategories = () => {
    const { user, setUser } = useUser();

    // Set a closed category.
    const setClosedCategory = (type, value) => new Promise((resolve, reject) => fetch.patch("/api/settings/closedCategories", { type, value }).then(async res => {
        const categories = user.settings.categoriesClosed;

        if (type && !categories.includes(value)) categories.push(value);
        else if (!type && categories.includes(value)) categories.splice(categories.indexOf(value), 1);

        await setUser({ ...user, settings: { ...user.settings, categoriesClosed: categories } });

        resolve();
    }).catch(reject));

    return setClosedCategory;
}

export default useClosedCategories;