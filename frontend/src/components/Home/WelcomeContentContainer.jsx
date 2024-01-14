import styles from "@styles";

export default function WelcomeContentContainer({ children }) {
    return <div className={styles.home.welcomeContainer}>{children}</div>;
}