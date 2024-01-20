export default function RouteWrapper({
    route,
    setTitle, setDescription, setBackground, setHeader, setSidebar, setTopRight,
    title, description, background, header, sidebar, topRight
}) {
    console.debug(`[RouteWrapper] Loaded ${route.path}`);

    if (route.title && (title !== route.title)) setTitle(route.title);
    if (route.description && (description !== route.description)) setDescription(route.description);

    if (background) setBackground(background);
    else if (background !== true) setBackground(true);

    if (route.plain) {
        setHeader(false);
        setSidebar(false);
        setTopRight(false);
    } else {
        if (route.topRight && (topRight !== route.topRight)) setTopRight(route.topRight);
        if (route.header && (header !== route.header)) {
            setHeader(route.header);
            if (sidebar) setSidebar(false);
            if (topRight) setTopRight(false);
        }
        if (route.sidebar && !sidebar) {
            setHeader(false);
            setSidebar(true);
        }
    }

    return route.element;
}