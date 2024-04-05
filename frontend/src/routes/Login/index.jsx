/**
 * @file Defines the Login page.
 */

import Authentication from "@views/Authentication"

/**
 * This object defines the route for the Login page.
 * @returns {Object} The Login route.
 */
export default {
    path: "/login",
    element: <Authentication type="Login" />,
    header: ["right", "/register", "Register"],
    title: `Login | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: `Login to your ${import.meta.env.VITE_INFORMATION_NAME} account.`,
}