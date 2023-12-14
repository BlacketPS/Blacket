import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { config } from "@stores/config";
import pages from "@pages";

const router = createBrowserRouter([
    {
        errorElement: <pages.Errors />,
        children: [
            { path: "*", element: <pages.Errors code={404} /> },
            { path: "/", element: <pages.Home /> },
            { path: "/login", element: <pages.Authentication type="Login" /> },
            { path: "/register", element: <pages.Authentication type="Register" /> },
        ]
    }
]);

export default function App() {
    const [loaded, setLoaded] = useState(false);
    const [message, setMessage] = useState("configuration");

    useEffect(() => config !== null && setLoaded(true), []);

    return !loaded ? <pages.Loading message={message} /> : typeof config == "string" ?
        (<pages.Errors code={403} reason={config} />) : config === 1 ? (<pages.Errors code={502} />) :
            <RouterProvider router={router} />
}