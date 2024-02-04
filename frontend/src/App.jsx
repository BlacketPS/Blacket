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

import { Background, Header, HeaderNoLink, Sidebar, TopRightContainer } from "@components";

export default function App() {
    const [loaded, setLoaded] = useState(false);
    const [message, setMessage] = useState("server status");

    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [background, setBackground] = useState(true);
    const [header, setHeader] = useState(false);
    const [sidebar, setSidebar] = useState(false);
    const [topRight, setTopRight] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const serverStatus = await fetch.get("/api").then(res => res).catch(err => err);

            if (serverStatus.status === 403) return setLoaded(serverStatus.data.message);
            else if (!serverStatus.ok) return setLoaded(1);

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

    // if loaded is a string the user is blacklisted and if its 1 the server is under maintenance else render blacket
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