import styles from "@styles";

export default function WelcomeContainer({ children }) {
    return <div className={styles.home.welcomeContainer}>{children}</div>;
}