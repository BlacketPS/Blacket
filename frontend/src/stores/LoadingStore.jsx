/**
 * @file The loading store provider and hook.
 */

import { createContext, useContext, useState } from "react";
import Loader from "@components/Loader";

// Create a context for the loading store
const LoadingStoreContext = createContext();

/**
 * The hook that allows components to interact with the loading store.   
 * This allows components to be able to show a loading spinner when needed.
 * 
 * @property {Boolean} loading The loading state.
 * @property {Function} setLoading The function to set the loading state.
 * 
 * @returns {Object} The loading store context.
 */
export function useLoading() {
    return useContext(LoadingStoreContext);
}

/**
 * The provider for the loading store.
 * @param {Object} props The properties of the component.
 * @param {Object} props.children The children components.
 * @returns The loading store provider.
 */
export function LoadingStoreProvider({ children }) {
    // Get/set the loading state
    const [loading, setLoading] = useState(false);

    return (
        <LoadingStoreContext.Provider value={{ loading, setLoading }}>
            {typeof loading === "string" ? <Loader message={`${loading}...`} /> : loading ? <Loader /> : null}
            {children}
        </LoadingStoreContext.Provider>
    )
}