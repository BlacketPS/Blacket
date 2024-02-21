import { createContext, useContext, useEffect, useState } from "react";
import Loading from "@views/Loading";

const UserStoreContext = createContext();

export function useUser() {
    return useContext(UserStoreContext);
}

export function UserStoreProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => await fetch.get("/api/users/me").then(res => setUser(res.data.user)).catch(() => localStorage.removeItem("token"));

        if (localStorage.getItem("token")) fetchUser().then(() => setLoading(false)).catch(() => setLoading(false));
        else setLoading(false);
    }, []);

    return <UserStoreContext.Provider value={{ user, setUser }}>{!loading ? children : <Loading message="user data" />}</UserStoreContext.Provider>;
}