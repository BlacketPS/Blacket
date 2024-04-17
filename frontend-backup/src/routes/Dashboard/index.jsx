import Dashboard from "@views/Dashboard";

export default {
    path: "/dashboard",
    element: <Dashboard />,
    sidebar: true,
    topRight: [],
    title: `Dashboard | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: "View the statistics of your account or others accounts.",
}