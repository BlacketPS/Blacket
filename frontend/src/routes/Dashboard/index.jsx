/**
 * @file Defines the Dashboard route.
 */

import Dashboard from "@views/Dashboard";

/**
 * This object defines the route for the Dashboard page.
 * @returns {Object} The Dashboard route.
 */
export default {
    path: "/dashboard",
    element: <Dashboard />,
    sidebar: true,
    topRight: [],
    title: `Dashboard | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: "View the statistics of your account or others accounts.",
}