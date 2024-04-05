/**
 * @file Defines the News page.
 */

import News from "@views/News";

/**
 * This object defines the route for the News page.
 * @returns {Object} The News route.
 */
export default {
    path: "/news",
    element: <News />,
    sidebar: true,
    topRight: [],
    title: `News | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: `Get the latest updates on ${import.meta.env.VITE_INFORMATION_NAME}.`
}