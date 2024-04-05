/**
 * @file The Loading view. This view is responsible for displaying the loading screen.
 */

import { Background, Loader } from "@components";

/**
 * The Loading view.
 * @param {Object} props The properties for this component.
 * @param {string} props.message The message to display.
 * @returns {JSX.Element} The Loading view.
 */
export default function Loading({ message }) {
    document.title = `Loading | ${import.meta.env.VITE_INFORMATION_NAME}`;

    return (<>
        <Background />
        <Loader image="/content/blooks/Console.gif" message={`Loading ${message}...`} />
    </>)
}
