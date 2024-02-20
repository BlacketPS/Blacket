import News from "@views/News";

export default {
    path: "/news",
    element: <News />,
    sidebar: true,
    topRight: [],
    title: `News | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: `Get the latest updates on ${import.meta.env.VITE_INFORMATION_NAME}.`
}