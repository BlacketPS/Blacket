import styles from "@styles";

export default function WelcomeDescription() {
    return (
        <div className={styles.home.welcomeDescription}>
            {import.meta.env.VITE_INFORMATION_DESCRIPTION.split(",").map((word, i) => <div key={i}>{word}</div>)}
        </div>
    )
}