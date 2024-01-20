import pages from "@pages";

export default {
    path: "*",
    element: <pages.Errors code={404} />,
    header: "link",
    title: `Not Found | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: "The page you are looking for does not exist.",
}