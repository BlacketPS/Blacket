import styles from "@styles";

/**
 * The welcome description component.
 * @returns {JSX.Element} The welcome description component.
 */
export default function WelcomeDescription() {
    return (
        <div className={styles.home.welcomeDescription}>
            {import.meta.env.VITE_INFORMATION_DESCRIPTION.split(",").map((word, i) => <div key={i}>{word}</div>)}
        </div>
    )
}