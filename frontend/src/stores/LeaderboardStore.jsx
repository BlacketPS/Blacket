import { createContext, useContext, useState } from "react";

const LeaderboardStoreContext = createContext();

export function useLeaderboard() {
    return useContext(LeaderboardStoreContext);
}

export function LeaderboardStoreProvider({ children }) {
    const [sortBy, setSortBy] = useState("tokens");
    const [leaderboard, setLeaderboard] = useState(null);

    return <LeaderboardStoreContext.Provider value={{
        sortBy, setSortBy,
        leaderboard, setLeaderboard
     }}>{children}</LeaderboardStoreContext.Provider>;
}
