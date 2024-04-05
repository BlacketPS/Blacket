/**
 * @file Defines the Blooks page.
 */

import Blooks from "@views/Blooks";

/**
 * This object defines the route for the Blooks page.
 * @returns {Object} The Blooks route.
 */
export default {
    path: "/blooks",
    element: <Blooks />,
    sidebar: true,
    topRight: ["tokens"],
    title: `Blooks | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: "View all of your blooks and manage them."
}