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
        // If the route's title is different from the current title, set the title to what the route requires.
        if (route.title && (title !== route.title)) setTitle(route.title);
        // If the route's description is different from the current description, set the description to what the route requires.
        if (route.description && (description !== route.description)) setDescription(route.description);

        // If the background has not been set, set it to true to make sure the background is shown.
        if (background) setBackground(background);
        else if (background === undefined) setBackground(true);

        // If the route is plain, set the header, sidebar, and top right container to false.
        if (route.plain) {
            setHeader(false);
            setSidebar(false);
            setTopRight(false);
        } else {
            // Does the route require a header, sidebar, or top right container?
            
            // If the route requires a top right container and the top right container is not already shown, show the top right container.
            if (route.topRight && (topRight !== route.topRight)) setTopRight(route.topRight);
            
            // If the route requires a header and the header is not already shown, show the header.
            if (route.header && (header !== route.header)) {
                setHeader(route.header);
                if (sidebar) setSidebar(false);
                if (topRight) setTopRight(false);
            }

            // If the route requires a sidebar and the sidebar is not already shown, show the sidebar and hide the header instead.
            if (route.sidebar && !sidebar) {
                setHeader(false);
                setSidebar(true);
            }
        }
    }, [route, title, description, background, header, sidebar, topRight]);

    // Log that the route has been loaded.
    useEffect(() => {
        console.debug(`[RouteWrapper] Loaded ${route.path}`);
    }, [route]);

    // Return the route's parent element.
    return route.element;
});