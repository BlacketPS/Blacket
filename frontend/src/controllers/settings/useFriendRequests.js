import { useUser } from "@stores/UserStore";

/**
 * The hook that handles setting who can send friend requests.
 * @returns {Function} The function to set who can send friend requests.
 */
const useFriendRequests = () => {
    const { user, setUser } = useUser();

    // Sends a request to the server to set who can send friend requests.
    const setFriendRequests = (value) => new Promise((resolve, reject) => fetch.patch("/api/settings/friendRequests", { value }).then(async res => {
        await setUser({ ...user, settings: { ...user.settings, friendRequests: value } });

        resolve();
    }).catch(reject));

    return setFriendRequests;
}

export default useFriendRequests;