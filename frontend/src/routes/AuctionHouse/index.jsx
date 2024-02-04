import AuctionHouse from "@views/AuctionHouse";

export default {
    path: "/auction-house",
    element: <AuctionHouse />,
    sidebar: true,
    topRight: ["tokens"],
    title: `Auction House | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: "Buy and sell Blooks and items on the Auction House.",
}