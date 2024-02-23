import styles from "@styles";

export default function ChatContainer({children}) {
    return <div className={styles.chat.container}>{children}</div>;
}