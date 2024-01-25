import pages from "@pages";

export default {
    path: "/settings",
    element: <pages.Settings />,
    sidebar: true,
    topRight: [],
    title: `Settings | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: "Change the settings of your account."
}