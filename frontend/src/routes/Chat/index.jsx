import Chat from "@views/Chat";

export default {
    path: "/chat",
    element: <Chat />,
    sidebar: true,
    topRight: [],
    title: `Chat | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: "Chat with other players."
}