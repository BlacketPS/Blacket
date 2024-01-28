import axios from "axios";
import { useUser } from "@stores/UserStore";

const useUsername = () => {
    const { user, setUser } = useUser();

    const setUsername = (newUsername, password) => new Promise((resolve, reject) => axios.patch("/api/settings/username", { newUsername, password }).then(async res => {
        await setUser({ ...user, username: newUsername });

        resolve();
    }).catch(reject));

    return setUsername;
}

export default useUsername;