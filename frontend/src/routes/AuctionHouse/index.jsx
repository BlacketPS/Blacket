/**
 * @file Defines the Auction House page.
 */

import AuctionHouse from "@views/AuctionHouse";

/**
 * This object defines the route for the Auction House page.
 * @returns {Object} The Auction House route.
 */
export default {
    path: "/auction-house",
    element: <AuctionHouse />,
    sidebar: true,
    topRight: ["tokens"],
    title: `Auction House | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: "Buy and sell Blooks and items on the Auction House.",
}