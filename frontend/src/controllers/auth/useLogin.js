import axios from "axios";
import { useUser } from "@stores/UserStore";

const useLogin = () => {
    const { setUser } = useUser();

    const login = (username, password, code) => new Promise((resolve, reject) => axios.post("/api/auth/login", { username, password, code }).then(async res => {
        if (res.data.codeRequired) return resolve("codeRequired");

        localStorage.setItem("token", res.data.token);

        await setUser(await axios.get("/api/users/me").then(res => res.data.user));

        resolve();
    }).catch(reject));

    return login;
}

export default useLogin;