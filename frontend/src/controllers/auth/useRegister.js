import { useUser } from "@stores/UserStore";
import { useSocket } from "@stores/SocketStore";

const useRegister = () => {
    const { setUser } = useUser();
    const { initializeSocket } = useSocket();

    const register = (username, password, accessCode, checked) => new Promise((resolve, reject) => fetch.post("/api/auth/register", {
        username,
        password,
        accessCode,
        acceptedTerms: checked
    }).then(res => {
        localStorage.setItem("token", res.data.token);

        fetch.get("/api/users/me").then(res => {
            setUser(res.data.user);

            initializeSocket(res.data.token);

            resolve();
        }).catch(reject);
    }).catch(reject));

    return register;
}

export default useRegister;
