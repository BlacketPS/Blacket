import Inventory from "@views/Inventory";

export default {
    path: "/inventory",
    element: <Inventory />,
    sidebar: true,
    topRight: [],
    title: `Inventory | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: "View all of your items and manage them."
}