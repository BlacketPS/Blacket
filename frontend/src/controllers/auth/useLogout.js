import { useUser } from "@stores/UserStore";
import { useSocket } from "@stores/SocketStore";

const useLogout = () => {
    const { setUser } = useUser();
    const { connect } = useSocket();

    const logout = async () => {
        setUser(null);

        await fetch.delete("/api/auth/logout").then(() => connect());

        localStorage.removeItem("token");
    }

    return logout;
}

export default useLogout;