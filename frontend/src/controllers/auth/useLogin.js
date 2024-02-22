import { useUser } from "@stores/UserStore";
import {useSocket} from "@stores/SocketStore";

const useLogin = () => {
    const { setUser } = useUser();
    const { initializeSocket } = useSocket();

    const login = (username, password, code) => new Promise((resolve, reject) => fetch.post("/api/auth/login", { username, password, code }).then(async res => {
        if (res.data.codeRequired) return resolve("codeRequired");

        localStorage.setItem("token", res.data.token);

        await setUser(await fetch.get("/api/users/me").then(res => res.data.user));

        await initializeSocket();

        resolve();
    }).catch(reject));

    return login;
}

export default useLogin;