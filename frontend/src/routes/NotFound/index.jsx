/**
 * @file Defines the page for when a route is not found.
*/

import Errors from "@views/Errors";

/**
 * This object defines the route for the "404" Not Found page.
 * @returns {Object} The route for the "404" Not Found page.
 */
export default {
    path: "*",
    element: <Errors code={404} />,
    header: "link",
    title: `Not Found | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: "The page you are looking for does not exist.",
}