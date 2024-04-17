import Home from "@views/Home";

export default {
    path: "/",
    element: <Home />,
    plain: true,
    title: import.meta.env.VITE_INFORMATION_NAME,
    description: import.meta.env.VITE_INFORMATION_DESCRIPTION.split(",").map(word => word)
}