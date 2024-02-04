import Leaderboard from "@views/Leaderboard";

export default {
    path: "/leaderboard",
    element: <Leaderboard />,
    sidebar: true,
    topRight: [],
    title: `Leaderboard | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: "View the top 10 players."
}