/**
 * @file Defines the Inventory route.
 */

import Inventory from "@views/Inventory";

/**
 * This object defines the route for the Inventory page.
 * @returns {Object} The Inventory route.
 */
export default {
    path: "/inventory",
    element: <Inventory />,
    sidebar: true,
    topRight: [],
    title: `Inventory | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: "View all of your items and manage them."
}