import { useState, useEffect } from "react";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import pages from "@pages";

const router = createBrowserRouter([
    {
        errorElement: <pages.Errors />,
        children: [
            { path: "*", element: <pages.Errors code={404} /> },
            { path: "/", element: <pages.Home /> },
            { path: "/login", element: <pages.Authentication type="Login" /> },
            { path: "/register", element: <pages.Authentication type="Register" /> },
            { path: "/dashboard", element: <pages.Dashboard /> }
        ]
    }
]);

export default function App() {
    const [loaded, setLoaded] = useState(false);
    const [message, setMessage] = useState("configuration");

    useEffect(() => {
        /*fetch("/api").then(res => {
            if (res.status === 200) setLoaded(true);
            else if (res.status === 403) setMessage(res.text());
            else setLoaded(1);
        }).catch(() => setLoaded(1));
        setTimeout(() => { setMessage("blooks") }, 500);
        setTimeout(() => { setMessage("packs") }, 633);
        setTimeout(() => { setMessage("rarities") }, 866);
        setTimeout(() => { setLoaded(true) }, 1000);*/
        setLoaded(true);
    }, []);

    if (!loaded) return <pages.Loading message={message} />;
    else if (typeof loaded === "string") return <pages.Errors code={403} reason={loaded} />;
    else if (loaded === 1) return <pages.Errors code={502} />;
    else return <RouterProvider router={router} />
}