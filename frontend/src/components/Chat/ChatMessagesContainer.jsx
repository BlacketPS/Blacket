import { memo } from "react";
import styles from "@styles";

export default memo(function ChatMessagesContainer({ aboveInput, children }) {
    return <ul className={styles.chat.messagesContainer} data-above-input={aboveInput ? true : false} onContextMenu={e => e.preventDefault()}>{children}</ul>;
});