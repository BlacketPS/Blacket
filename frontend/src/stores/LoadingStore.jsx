import { createContext, useState } from "react";
import Loader from "@components/Loader";

export const LoadingStoreContext = createContext();

export function LoadingStoreProvider({ children }) {
    const [loading, setLoading] = useState(false);

    return <LoadingStoreContext.Provider value={{ loading, setLoading }}>
        {typeof loading === "string" ? <Loader message={`${loading}...`} /> : loading ? <Loader /> : null}
        {children}
    </LoadingStoreContext.Provider>
}