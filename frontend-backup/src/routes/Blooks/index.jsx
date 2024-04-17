import Blooks from "@views/Blooks";

export default {
    path: "/blooks",
    element: <Blooks />,
    sidebar: true,
    topRight: ["tokens"],
    title: `Blooks | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: "View all of your blooks and manage them."
}