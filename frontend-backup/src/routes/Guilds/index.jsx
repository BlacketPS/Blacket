import Guilds from "@views/Guilds";

export default {
    path: "/guilds",
    element: <Guilds />,
    sidebar: true,
    topRight: [],
    title: `Guilds | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: "Join a guild and compete with other players."
}