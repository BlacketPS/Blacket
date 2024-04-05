/**
 * @file Defines the route and metadata for the Trading Plaza.
 */

import TradingPlaza from "@views/TradingPlaza";

/**
 * This object defines the route for the Trading Plaza.
 * @returns {Object} The Trading Plaza route.
 */
export default {
    path: "/trading-plaza",
    element: <TradingPlaza />,
    sidebar: true,
    topRight: ["tokens"],
    title: `Trading Plaza | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: "Trade your tokens and blooks with other users."
}