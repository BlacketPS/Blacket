import TradingPlaza from "@views/TradingPlaza";

export default {
    path: "/trading-plaza",
    element: <TradingPlaza />,
    sidebar: true,
    topRight: ["tokens"],
    title: `Trading Plaza | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: "Trade your tokens and blooks with other users."
}