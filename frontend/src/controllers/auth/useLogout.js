import { useUser } from "@stores/UserStore";

const useLogout = () => {
    const { setUser } = useUser();

    const logout = async () => {
        setUser(null);

        await fetch.delete("/api/auth/logout");

        localStorage.removeItem("token");
    }

    return logout;
}

export default useLogout;