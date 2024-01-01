import { createContext, useState } from "react";

export const UserStoreContext = createContext();

export function UserStoreProvider({ children }) {
    const [user, setUser] = useState(null);

    return <UserStoreContext.Provider value={{ user, setUser }}>
        {children}
    </UserStoreContext.Provider>
}