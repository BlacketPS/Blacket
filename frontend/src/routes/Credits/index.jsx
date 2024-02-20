import Credits from "@views/Credits";

export default {
    path: "/credits",
    element: <Credits />,
    sidebar: true,
    topRight: [],
    title: `Credits | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: "Who made this game?"
}