/**
 * @file Renders the frontend and handles routes.
 */

import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import { Routes, Route } from "react-router-dom";
import RouteWrapper from "./RouteWrapper";
import routes from "./routes";

import Loading from "@views/Loading";
import Errors from "@views/Errors";

import ErrorBoundary from "./ErrorBoundary";

import StoreWrapper from "@stores";
import { getBlooks } from "@stores/BlookStore";
import { getRarities } from "@stores/RarityStore";
import { getPacks } from "@stores/PackStore";
import { getItems } from "@stores/ItemStore";
import { getTitles } from "@stores/TitleStore";
import { getBanners } from "@stores/BannerStore";
import { getBadges } from "@stores/BadgeStore";
import { getEmojis } from "@stores/EmojiStore";

import { DebugInformation, Background, Header, HeaderNoLink, Sidebar, TopRightContainer } from "@components";

/**
 * The main App component that renders the frontend and handles routes.
 * @returns {JSX.Element} The main App component, containing the sidebar (if it should be shown), the header (if it should be shown), the title and description of the current page, and the routes.
 */
export default function App() {
    // Has all necessary data been loaded?
    const [loaded, setLoaded] = useState(false);
    // The current message to display while loading data.
    const [message, setMessage] = useState("server status");

    /**
     * Should the debug information be shown?
     * Activated by pressing F4.
     */
    const [showDebugInformation, setShowDebugInformation] = useState(import.meta.env.MODE === "development" ? true : false);
    
    // The title of the current page.
    const [title, setTitle] = useState(null);
    // The description of the current page.
    const [description, setDescription] = useState(null);

    // Should the background be shown?
    const [background, setBackground] = useState(true);

    // Should the header be shown? Should it be shown with a link, or without a link?
    const [header, setHeader] = useState(false);

    // Should the sidebar be shown?
    const [sidebar, setSidebar] = useState(false);

    // Should the top right container be shown?
    const [topRight, setTopRight] = useState(false);

    useEffect(() => {
        window.addEventListener("keydown", e => e.key === "F4" && setShowDebugInformation(show => !show));

        /**
         * Fetches all necessary data from the server and sets the loaded state accordingly.
         * @returns {Promise<void>} The result of the fetch request.
         */
        const fetchData = async () => {
            // Fetch server status
            const serverStatus = await fetch.get("/api").then(res => res).catch(err => err);

            // If the server is under maintenance or the user is blacklisted, set the loaded state accordingly
            if (serverStatus.status === 403) return setLoaded(serverStatus.data.message);
            else if (!serverStatus.ok) return setLoaded(1);

             /*
                Fetch all necessary data from the server and progresses the loading messages.
                If any of the fetch requests fail, set the loaded state to 1 to render the server under maintenance page.
             */
            setMessage("blooks"); if ((await getBlooks()) instanceof Error) return setLoaded(1);
            setMessage("rarities"); if ((await getRarities()) instanceof Error) return setLoaded(1);
            setMessage("packs"); if ((await getPacks()) instanceof Error) return setLoaded(1);
            setMessage("items"); if ((await getItems()) instanceof Error) return setLoaded(1);
            setMessage("titles"); if ((await getTitles()) instanceof Error) return setLoaded(1);
            setMessage("banners"); if ((await getBanners()) instanceof Error) return setLoaded(1);
            setMessage("badges"); if ((await getBadges()) instanceof Error) return setLoaded(1);
            setMessage("emojis"); if ((await getEmojis()) instanceof Error) return setLoaded(1);

            // The loading has completed!
            setLoaded(true);
        }

        // Fetch data
        fetchData();

        // Cleanup
        return () => {
            window.removeEventListener("keydown", e => e.key === "F4" && setShowDebugInformation(show => !show));
        }
    }, []);

     /*
        If loaded is a string, the user is blacklisted.
        If loaded is 1, the server is under maintenance.
        If neither of the above, render the frontend!
     */
    if (!loaded) return <Loading message={message} />;
    else if (typeof loaded === "string") return <Errors code={403} reason={loaded} />;
    else if (loaded === 1) return <Errors code={502} />;
    else return (<ErrorBoundary>
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Helmet>

        {background && <Background />}

        <StoreWrapper>
            {showDebugInformation && <DebugInformation />}

            {(header && header[0] && header[0] === "right") && <Header right={{ link: header[1], text: header[2] }} />}
            {(header && header === "link") && <Header />}
            {(header && header === "nolink") && <HeaderNoLink />}

            {sidebar && <Sidebar />}

            {topRight && <TopRightContainer content={topRight} />}

            <Routes>
                {Object.values(routes).map(route => <Route key={route.path} path={route.path} element={<RouteWrapper
                    route={route}
                    setTitle={setTitle} setDescription={setDescription} setBackground={setBackground} setHeader={setHeader} setSidebar={setSidebar} setTopRight={setTopRight}
                    title={title} description={description} background={background} header={header} sidebar={sidebar} topRight={topRight}
                />} />)}
            </Routes>
        </StoreWrapper>
    </ErrorBoundary>)
}
