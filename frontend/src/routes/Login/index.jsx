import pages from "@pages";

export default {
    path: "/login",
    element: <pages.Authentication type="Login" />,
    header: ["right", "/register", "Register"]
}
