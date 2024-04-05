/**
 * @file The leaderboard store provider and hook.
 */

import { createContext, useContext, useState } from "react";

// Create a context for the leaderboard store
const LeaderboardStoreContext = createContext();

/**
 * The hook that allows components to interact with the leaderboard store.
 * 
 * @property {String} sortBy The current value to sort the leaderboard by.
 * @property {Function} setSortBy The function to set the value to sort the leaderboard by.
 * @property {Array} leaderboard The current leaderboard.
 * @property {Function} setLeaderboard The function to set the leaderboard.
 * 
 * @returns {Object} The leaderboard store context.
 */
export function useLeaderboard() {
    return useContext(LeaderboardStoreContext);
}

/**
 * The provider for the leaderboard store.
 * @param {Object} props The properties of the component.
 * @param {Object} props.children The children components.
 * @returns The leaderboard store provider.
 */
export function LeaderboardStoreProvider({ children }) {
    // Get/set the current value to sort the leaderboard by
    const [sortBy, setSortBy] = useState("tokens");
    // Get/set the current leaderboard
    const [leaderboard, setLeaderboard] = useState(null);

    return <LeaderboardStoreContext.Provider value={{
        sortBy, setSortBy,
        leaderboard, setLeaderboard
     }}>{children}</LeaderboardStoreContext.Provider>;
}
