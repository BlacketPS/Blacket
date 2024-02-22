import { useUser } from "@stores/UserStore";
import { useSocket } from "@stores/SocketStore";

const useLogout = () => {
    const { setUser } = useUser();
    const { initializeSocket } = useSocket();

    const logout = async () => {
        setUser(null);

        await fetch.delete("/api/auth/logout").then(() => initializeSocket());

        localStorage.removeItem("token");
    }

    return logout;
}

export default useLogout;