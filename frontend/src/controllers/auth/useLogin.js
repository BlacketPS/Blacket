import axios from "axios";
import { useUser } from "@stores/UserStore";

const useLogin = () => {
    const { setUser } = useUser();

    const login = (username, password) => new Promise((resolve, reject) => axios.post("/api/auth/login", { username, password }).then(async res => {
        localStorage.setItem("token", res.data.token);

        await setUser(await axios.get("/api/users/me").then(res => res.data.user));

        resolve();
    }).catch(reject));

    return login;
}

export default useLogin;