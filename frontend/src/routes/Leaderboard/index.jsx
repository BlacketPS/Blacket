/**
 * @file Defines the Leaderboard page.
 */

import Leaderboard from "@views/Leaderboard";

/**
 * This object defines the route for the Leaderboard page.
 * @returns {Object} The Leaderboard route.
 */
export default {
    path: "/leaderboard",
    element: <Leaderboard />,
    sidebar: true,
    topRight: [],
    title: `Leaderboard | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: "View the top 10 players."
}