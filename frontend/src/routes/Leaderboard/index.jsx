import pages from "@pages";

export default {
    path: "/leaderboard",
    element: <pages.Leaderboard />,
    sidebar: true,
    topRight: [],
    title: `Leaderboard | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: "View the top 10 players."
}