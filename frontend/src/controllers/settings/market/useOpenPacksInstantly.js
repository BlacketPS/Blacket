import { useUser } from "@stores/UserStore";

const useOpenPacksInstantly = () => {
    const { user, setUser } = useUser();

    const setInstantOpen = (value) => new Promise((resolve, reject) => fetch.patch("/api/settings/market/openPacksInstantly", { value }).then(async res => {
        await setUser({ ...user, settings: { ...user.settings, openPacksInstantly: value } });

        resolve();
    }).catch(reject));

    return setInstantOpen;
}

export default useOpenPacksInstantly;