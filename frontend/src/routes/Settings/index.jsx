import Settings from "@views/Settings";

export default {
    path: "/settings",
    element: <Settings />,
    sidebar: true,
    topRight: [],
    title: `Settings | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: "Change the settings of your account."
}