import Background from "@components/Background";
import Loader from "@components/Loader";
import styles from "@styles";

export default function Loading({ message }) {
    document.title = `Loading | ${import.meta.env.VITE_INFORMATION_NAME}`;

    return (
        <>
            <Background />

            <div className={styles.loading.body}>
                <Loader image="/content/blooks/Console.gif" message={`Loading ${message}...`} />
            </div>
        </>
    )
}