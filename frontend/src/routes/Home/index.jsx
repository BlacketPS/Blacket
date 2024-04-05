/**
 * @file Defines the Home page.
 */

import Home from "@views/Home";

/**
 * This object defines the route for the Home page.
 * @returns {Object} The Home route.
 */
export default {
    path: "/",
    element: <Home />,
    plain: true,
    title: import.meta.env.VITE_INFORMATION_NAME,
    description: import.meta.env.VITE_INFORMATION_DESCRIPTION.split(",").map(word => word)
}