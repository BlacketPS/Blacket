import pages from "@pages";

export default {
    path: "/dashboard",
    element: <pages.Dashboard />,
    sidebar: true,
    topRight: [],
    title: `Dashboard | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: "View the statistics of your account or others accounts.",
}