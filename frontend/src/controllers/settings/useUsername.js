import { useUser } from "@stores/UserStore";

/**
 * The hook that handles setting the username.
 * @returns {Function} The function to set the username.
 */
const useUsername = () => {
    const { user, setUser } = useUser();

    // Sends a request to the server to set the username.
    const setUsername = (newUsername, password) => new Promise((resolve, reject) => fetch.patch("/api/settings/username", { newUsername, password }).then(async res => {
        await setUser({ ...user, username: newUsername });

        resolve();
    }).catch(reject));

    return setUsername;
}

export default useUsername;