/**
 * @file Defines the Settings page.
 */

import Settings from "@views/Settings";

/**
 * This object defines the route for the Settings page.
 * @returns {Object} The Settings route.
 */
export default {
    path: "/settings",
    element: <Settings />,
    sidebar: true,
    topRight: [],
    title: `Settings | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: "Change the settings of your account."
}