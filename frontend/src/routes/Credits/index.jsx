/**
 * @file Defines the Credits route.
 */

import Credits from "@views/Credits";

/**
 * This object defines the route for the Credits page.
 * @returns {Object} The Credits route.
 */
export default {
    path: "/credits",
    element: <Credits />,
    sidebar: true,
    topRight: [],
    title: `Credits | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: "Who made this game?"
}