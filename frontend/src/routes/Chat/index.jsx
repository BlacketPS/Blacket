/**
 * @file Defines the Chat route.
 */

import Chat from "@views/Chat";

/**
 * This object defines the route for the Chat page.
 * @returns {Object} The Chat route.
 */
export default {
    path: "/chat",
    element: <Chat />,
    sidebar: true,
    topRight: [],
    title: `Chat | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: "Chat with other players."
}