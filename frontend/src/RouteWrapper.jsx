/**
 * @file Provides a RouteWrapper who sets the necessary information for the App component corresponding to what the route deems necessary.
*/

import { memo, useEffect } from "react";

/**
 * The RouteWrapper component.
 * @param {Object} props The properties of the RouteWrapper component.
 * @param {Object} props.route The route object.
 * @param {Function} props.setTitle The function to set the title.
 * @param {Function} props.setDescription The function to set the description.
 * @param {Function} props.setBackground The function to set the background.
 * @param {Function} props.setHeader The function to set the header.
 * @param {Function} props.setSidebar The function to set the sidebar.
 * @param {Function} props.setTopRight The function to set the top right container.
 * @param {String} props.title The title of the current page.
 * @param {String} props.description The description of the current page.
 * @param {Boolean} props.background Should the background be shown?
 * @param {Boolean} props.header Should the header be shown?
 * @param {Boolean} props.sidebar Should the sidebar be shown?
 * @param {Boolean} props.topRight Should the top right container be shown?
 * @returns {JSX.Element} The RouteWrapper, containing solely the route's parent and children, after setting the necessary information.
 */
export default memo(function RouteWrapper({
    route,
    setTitle, setDescription, setBackground, setHeader, setSidebar, setTopRight,
    title, description, background, header, sidebar, topRight
}) {
    useEffect(() => {
        // Make sure the route has a title and description, and that they are not already set. Also set the background.
        if (route.title && (title !== route.title)) setTitle(route.title);
        if (route.description && (description !== route.description)) setDescription(route.description);

        if (background) setBackground(background);
        else if (background === undefined) setBackground(true);

        // Do not show most UI elements if the route is plain.
        if (route.plain) {
            setHeader(false);
            setSidebar(false);
            setTopRight(false);
        } else {
            // Prevent setting the header, sidebar, or top right container if they are already set.
            // Make sure the sidebar and top right container are NOT shown if the header is shown, and the header is NOT shown if the sidebar is shown.
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
    }, [route, title, description, background, header, sidebar, topRight]);

    useEffect(() => {
        console.debug(`[RouteWrapper] Loaded ${route.path}`);
    }, [route]);

    return route.element;
});