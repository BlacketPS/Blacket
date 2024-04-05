import styles from "@styles";

/**
 * The pronunciation button component. Displays a button that plays the pronunciation of the private server.
 * @returns {JSX.Element} The pronunciation button component.
 */
export default function PronunciationButton() {
    return (
        <div className={styles.home.pronounceButton} onClick={() => new Audio("/content/pronunciation.ogg").play()}>
            <i className="fas fa-volume-up" /> Pronunciation ("{import.meta.env.VITE_INFORMATION_PRONUNCIATION}")
        </div>
    )
}