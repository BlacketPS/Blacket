import { useUser } from "@stores/UserStore";
import { useSocket } from "@stores/SocketStore";

const useLogin = () => {
    const { setUser } = useUser();
    const { initializeSocket } = useSocket();

    const login = (username, password, otpCode) => new Promise((resolve, reject) => fetch.post("/api/auth/login", { username, password, otpCode }).then(res => {
        if (res.data.codeRequired) return resolve("codeRequired");

        localStorage.setItem("token", res.data.token);

        fetch.get("/api/users/me").then(res => {
            setUser(res.data.user);

            initializeSocket(res.data.token);

            resolve();
        }).catch(reject);
    }).catch(reject));

    return login;
}

export default useLogin;
