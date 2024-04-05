import { memo } from "react";
import styles from "@styles";

/**
 * The chat messages container component.
 * @param {Object} props The properties for this component.
 * @param {boolean} props.aboveInput If the container is above the input.
 * @param {Object} props.children The children of the component.
 * @returns {JSX.Element} The chat messages container component.
 */
export default memo(function ChatMessagesContainer({ aboveInput, children }) {
    return <ul className={styles.chat.messagesContainer} data-above-input={aboveInput ? true : false} onContextMenu={e => e.preventDefault()}>{children}</ul>;
});