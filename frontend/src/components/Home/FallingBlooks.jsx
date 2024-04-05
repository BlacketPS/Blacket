import styles from "@styles";

/**
 * The falling blooks component. Displays an image of falling blooks.
 * @returns {JSX.Element} The falling blooks component.
 */
export default function FallingBlooks() {
    return <img src="/content/fallingBlooks.png" alt="Blooks" className={styles.home.headerImage} draggable="false" />;
}