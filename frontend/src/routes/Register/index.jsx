import pages from "@pages";

export default {
    path: "/register",
    element: <pages.Authentication type="Register" />,
    header: ["right", "/login", "Login"],
    title: `Register | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: `Register an account to start playing ${import.meta.env.VITE_INFORMATION_NAME}.`,
}
