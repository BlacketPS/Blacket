import pages from "@pages";

export default {
    path: "/login",
    element: <pages.Authentication type="Login" />,
    header: ["right", "/register", "Register"],
    title: `Login | ${import.meta.env.VITE_INFORMATION_NAME}`,
    description: `Login to your ${import.meta.env.VITE_INFORMATION_NAME} account.`,
}