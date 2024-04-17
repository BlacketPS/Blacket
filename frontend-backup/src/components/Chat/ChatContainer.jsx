import { memo } from "react";
import styles from "@styles";

export default memo(function ChatContainer({ children }) {
    return <div className={styles.chat.container}>{children}</div>;
});