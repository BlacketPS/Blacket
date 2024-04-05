import styles from "@styles";

/**
 * The welcome container component.
 * @param {Object} props The properties for this component.
 * @param {Object} props.children The children of the component.
 * @returns {JSX.Element} The welcome container component.
 */
export default function WelcomeContainer({ children }) {
    return <div className={styles.home.welcomeContainer}>{children}</div>;
}