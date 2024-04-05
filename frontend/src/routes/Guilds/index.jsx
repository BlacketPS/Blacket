/**
 * @file Defines the Guilds route.
 */

import Guilds from "@views/Guilds";

/**
 * This object defines the route for the Guilds page.
 * @returns {Object} The Guilds route.
 */
export default {
    path: "/guilds",
    element: <Guilds />,
    sidebar: true,
    topRight: [],
    title: `Guilds | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: "Join a guild and compete with other players."
}