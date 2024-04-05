/**
 * @file The blooks store provider and hook.
 */


import { createContext, useContext, useEffect, useState } from "react";
import Loading from "@views/Loading";

// Create a context for the user store
const UserStoreContext = createContext();

/**
 * The hook that allows components to interact with the user store.
 * 
 * @property {Object} user The user data.
 * @property {Function} setUser The function to set the user data.
 *
 * @returns {Object} The user store context.
 */
export function useUser() {
    return useContext(UserStoreContext);
}

/**
 * The provider for the user store.
 * @param {Object} props The properties of the component.
 * @param {Object} props.children The children components.
 * @returns The user store provider.
 */
export function UserStoreProvider({ children }) {
    // Get/set the user data
    const [loading, setLoading] = useState(true);
    // Get/set the current user
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch the user data
        const fetchUser = async () => await fetch.get("/api/users/me").then(res => setUser(res.data.user)).catch(() => localStorage.removeItem("token"));

        // If the user is logged in, fetch the user data. Otherwise, stop loading.
        if (localStorage.getItem("token")) fetchUser().then(() => setLoading(false)).catch(() => setLoading(false));
        else setLoading(false);
    }, []);

    return <UserStoreContext.Provider value={{ user, setUser }}>{!loading ? children : <Loading message="user data" />}</UserStoreContext.Provider>;
}