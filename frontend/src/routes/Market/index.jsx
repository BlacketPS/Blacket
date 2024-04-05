/**
 * @file Defines the Market page.
*/

import Market from "@views/Market";

/**
 * This object defines the route for the Market page.
 * @returns {Object} The Market route.
 */
export default {
    path: "/market",
    element: <Market />,
    sidebar: true,
    topRight: ["tokens"],
    title: `Market | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: "Purchase packs and items and unlock blooks."
}