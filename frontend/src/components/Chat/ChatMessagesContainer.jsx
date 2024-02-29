import styles from "@styles";

export default function ChatMessagesContainer({children}) {
    return <ul className={styles.chat.messagesContainer} onContextMenu={e => e.preventDefault()}>{children}</ul>
}