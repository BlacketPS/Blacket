import styles from "@styles";

export default function WelcomeText() {
    return (
        <div className={styles.home.welcomeText}>
            {import.meta.env.VITE_INFORMATION_WELCOME.split(" ").map((word, i) => <div key={i}>{word}</div>)}
        </div>
    )
}