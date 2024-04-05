/**
 * @file Defines the Register page.
 */

import Authentication from "@views/Authentication";

/**
 * This object defines the route for the Register page.
 * @returns {Object} The Register route.
 */
export default {
    path: "/register",
    element: <Authentication type="Register" />,
    header: ["right", "/login", "Login"],
    title: `Register | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: `Register an account to start playing ${import.meta.env.VITE_INFORMATION_NAME}.`,
}
