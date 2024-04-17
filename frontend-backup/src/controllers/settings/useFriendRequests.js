import { useUser } from "@stores/UserStore";

const useFriendRequests = () => {
    const { user, setUser } = useUser();

    const setFriendRequests = (value) => new Promise((resolve, reject) => fetch.patch("/api/settings/friendRequests", { value }).then(async res => {
        await setUser({ ...user, settings: { ...user.settings, friendRequests: value } });

        resolve();
    }).catch(reject));

    return setFriendRequests;
}

export default useFriendRequests;