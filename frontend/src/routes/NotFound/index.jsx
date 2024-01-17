import pages from "@pages";

export default {
    path: "*",
    element: <pages.Errors code={404} />,
    header: "link"
}
