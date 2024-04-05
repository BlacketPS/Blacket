import { useUser } from "@stores/UserStore";

/**
 * The hook that allows the user to enable or disable opening packs instantly.
 * @returns {Function} The function to set the value of openPacksInstantly.
 */
const useOpenPacksInstantly = () => {
    const { user, setUser } = useUser();

    // Sends a request to the server to set openPacksInstantly.
    const setInstantOpen = (value) => new Promise((resolve, reject) => fetch.patch("/api/settings/market/openPacksInstantly", { value }).then(async res => {
        await setUser({ ...user, settings: { ...user.settings, openPacksInstantly: value } });

        resolve();
    }).catch(reject));

    return setInstantOpen;
}

export default useOpenPacksInstantly;