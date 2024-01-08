import { createContext, useState } from "react";
import axios from "axios";

export const UserStoreContext = createContext();

export function UserStoreProvider({ children }) {
    const [user, setUser] = useState(null);

    const fetchUser = async () => await axios.get("/api/users/me").then(res => setUser(res.data)).catch(err => console.error(err));

    return <UserStoreContext.Provider value={{
        user, setUser, actions: {
            fetchUser
        }
    }}>
        {children}
    </UserStoreContext.Provider>
}