import styles from "@styles";

export default function UsersTypingContainer({ usersTyping }) {
    return (
        <div className={styles.chat.usersTypingContainer} data-visible={usersTyping.length > 0}>
            {usersTyping.length > 0 ? (usersTyping.length > 4 ? <b>{usersTyping.length} people are typing...</b> : <>
                {usersTyping.sort((a, b) => b.username.localeCompare(a.username)).map((user, index) => <b key={user.id} className={
                    user.color === "rainbow" ? styles.textFormatting.rainbow : ""
                } style={{ color: user.color }}>{user.username}{index === usersTyping.length - 1 ? "" : ", "}</b>)}
                {usersTyping.length === 1 ? " is typing..." : " are typing..."}
            </>) : <b>Nobody's typing.</b>}
        </div>
    )
}