import { memo } from "react";
import styles from "@styles";

/**
 * The users typing container component.
 * @param {Object} props The properties for this component.
 * @param {Object[]} props.usersTyping The users typing in the chat.
 * @returns {JSX.Element} The users typing container component.
 */
export default memo(function UsersTypingContainer({ usersTyping }) {
    return (
        <div className={styles.chat.usersTypingContainer} data-visible={usersTyping.length > 0}>
            {usersTyping.length > 0 ? (usersTyping.length > 4 ? <b>{usersTyping.length} people are typing...</b> : <>
                {usersTyping.sort((a, b) => b.username.localeCompare(a.username)).map((user, index) => <b key={user.id} className={
                    user.color === "rainbow" ? styles.textFormatting.rainbow : ""
                } style={{ color: user.color }}>{user.username}{index === usersTyping.length - 1 ? "" : ", "}</b>)}
                {usersTyping.length === 1 ? " is typing..." : " are typing..."}
            </>) : <b>Nobody is typing.</b>}
        </div>
    )
});