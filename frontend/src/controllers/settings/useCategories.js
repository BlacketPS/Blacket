import { useUser } from "@stores/UserStore";

const useCategories = () => {
    const { user, setUser } = useUser();

    const setCategoryState = (type, value) => new Promise((resolve, reject) => fetch.patch("/api/settings/categories", { type, value }).then(async res => {
        const categories = user.settings.categoriesClosed;

        if (type && !categories.includes(value)) categories.push(value);
        else if (!type && categories.includes(value)) categories.splice(categories.indexOf(value), 1);

        await setUser({ ...user, settings: { ...user.settings, categoriesClosed: categories } });

        resolve();
    }).catch(reject));

    return setCategoryState;
}

export default useCategories;