import Errors from "@views/Errors";

export default {
    path: "*",
    element: <Errors code={404} />,
    header: "link",
    title: `Not Found | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: "The page you are looking for does not exist.",
}