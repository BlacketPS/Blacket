import Market from "@views/Market";

export default {
    path: "/market",
    element: <Market />,
    sidebar: true,
    topRight: ["tokens"],
    title: `Market | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: "Purchase packs and items and unlock blooks."
}