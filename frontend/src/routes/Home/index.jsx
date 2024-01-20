import pages from "@pages";

export default {
    path: "/",
    element: <pages.Home />,
    plain: true,
    title: import.meta.env.VITE_INFORMATION_NAME,
    description: import.meta.env.VITE_INFORMATION_DESCRIPTION.split(",").map(word => word)
}