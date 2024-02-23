import styles from "@styles";

export default function ChatMessagesContainer({children}) {
    return <ul className={styles.chat.messagesContainer}>{children}</ul>
}