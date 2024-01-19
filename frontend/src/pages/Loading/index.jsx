import { Loader } from "@components";

export default function Loading({ message }) {
    document.title = `Loading | ${import.meta.env.VITE_INFORMATION_NAME}`;

    return <Loader image="/content/blooks/Console.gif" message={`Loading ${message}...`} />;
}
