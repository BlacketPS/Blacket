import { useUser } from "@stores/UserStore";
import { useSocket } from "@stores/SocketStore";

const useLogout = () => {
    const { setUser } = useUser();
    const { initializeSocket } = useSocket();

    const logout = () => new Promise((resolve, reject) => fetch.delete("/api/auth/logout").then(() => {
        localStorage.removeItem("token");

        setUser(null);

        initializeSocket(null);

        resolve();
    }).catch(reject));

    return logout;
}

export default useLogout;