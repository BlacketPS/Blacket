import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import pages from "@pages";

import Stores from "@components/Stores";
import { getBlooks } from "@stores/BlookStore";
import { getRarities } from "@stores/RarityStore";
import { getPacks } from "@stores/PackStore";
import { getItems } from "@stores/ItemStore";
import { getTitles } from "@stores/TitleStore";
import { getBanners } from "@stores/BannerStore";
import { getBadges } from "@stores/BadgeStore";
import { getEmojis } from "@stores/EmojiStore";

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
    const [message, setMessage] = useState("server status");

    useEffect(() => {
        const fetchData = async () => {
            await fetch("/api").then(res => {
                if (res.status === 403) return setLoaded(res.data.message);
            }).catch(err => {
                console.error(err);
                return setLoaded(1);
            });

            setMessage("blooks"); if ((await getBlooks()) instanceof Error) return setLoaded(1);
            setMessage("rarities"); if ((await getRarities()) instanceof Error) return setLoaded(1);
            setMessage("packs"); if ((await getPacks()) instanceof Error) return setLoaded(1);
            setMessage("items"); if ((await getItems()) instanceof Error) return setLoaded(1);
            setMessage("titles"); if ((await getTitles()) instanceof Error) return setLoaded(1);
            setMessage("banners"); if ((await getBanners()) instanceof Error) return setLoaded(1);
            setMessage("badges"); if ((await getBadges()) instanceof Error) return setLoaded(1);
            setMessage("emojis"); if ((await getEmojis()) instanceof Error) return setLoaded(1);

            setLoaded(true);
        }

        fetchData();
    }, []);

    // check what loaded is, if its a string the user is blacklisted and if its 1 the server is under maintenance
    if (!loaded) return <pages.Loading message={message} />;
    else if (typeof loaded === "string") return <pages.Errors code={403} reason={loaded} />;
    else if (loaded === 1) return <pages.Errors code={502} />;
    else return <Stores><RouterProvider router={router} /></Stores>;
}