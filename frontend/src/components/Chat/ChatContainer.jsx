import { memo } from "react";
import styles from "@styles";

/**
 * The chat container component.
 * @param {Object} props The properties for this component.
 * @param {Object} props.children The children of the component.
 * @returns {JSX.Element} The chat container component.
 */
export default memo(function ChatContainer({ children }) {
    return <div className={styles.chat.container}>{children}</div>;
});