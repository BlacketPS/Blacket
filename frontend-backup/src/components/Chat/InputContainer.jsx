import { memo, useState } from "react";
import { useMessages } from "@stores/MessageStore";
import { UsersTypingContainer } from "@components/Chat";
import MarkdownPreview from "./MarkdownPreview";
import styles from "@styles";

export default memo(function InputContainer({ placeholder, maxLength }) {
    const { sendMessage, startTyping, usersTyping, replyingTo, setReplyingTo } = useMessages();

    const [editor, setEditor] = useState(null);
    const [content, setContent] = useState("");
    const [mentionList, setMentionList] = useState([]);

    function insertPing(user) {
        const text = content.split(" ");
        text[text.length - 1] = `<@${user.id}> `;
        console.log(text)

        editor.clearContent();
        editor.insertText(text.join(" ") + "a");

        setMentionList([]);
    };

    return (
        <div className={styles.chat.messageForm}>
            <UsersTypingContainer usersTyping={usersTyping} />

            {replyingTo && <div className={styles.chat.aboveInputContainer}>
                <div>Replying to <b>{replyingTo.author.username}</b></div>
                <i className="fas fa-times" onClick={() => setReplyingTo(null)} />
            </div>}

            {/* Whoever wants to take over and finish, it only adds the new reply at the very end and only detects reply at the very end... */}
            {/* You can probably also hide the id and replace it with their name... */}
            {
                <div className={`${styles.chat.mentionList} ${mentionList.length > 0 ? styles.chat.usersInMentionList : ""}`}>
                    {mentionList.map(user => <div className={styles.chat.mentionUser} key={user.id} onClick={() => {
                        // im so tired I don't feel like thinking lmao gn
                        insertPing(user);
                    }}>
                        <div className={styles.chat.userMentionContainer}>
                            <img src={user.avatar || "https://rewrite.blacket.org/content/blooks/Default.png"} alt={user.username} />
                            <p style={{color: user.color}} className={`${user.color === "rainbow" ? styles.textFormatting.rainbow : ""}`}>{user.username}</p>
                        </div>
                    </div>)}
                </div>
            }

            <MarkdownPreview
                className={styles.chat.messageInput}
                placeholder={placeholder}
                spellCheck
                autoFocus
                onInput={() => startTyping()}
                onKeyDown={e => {
                    if ((e.key === "Enter" || e.key === "Tab") && mentionList.length > 0) {
                        e.preventDefault();
                        insertPing(mentionList[0]);
                        return;
                    }

                    // This is a temporary fix for the mentions, it's not perfect but it works for now
                    // Refer to above comments for more information on how to fix it
                    // You can determine it by the word on the carat position and then check if it's a mention unless this is fine (which its not)

                    const mentions = content.split(" ").filter(mention => mention.startsWith("@")).filter(mention => mention.slice(1).match(/^[0-9]+$/) === null && mention.slice(1).length >= 2);

                    if (mentions.length > 0 && !content.endsWith(" ")) {
                        // Can be replaced with socket
                        fetch.post(`/api/chat/get-user-list`, { query: mentions[mentions.length - 1].slice(1) })
                        .then(res => {
                            setMentionList(res.data.users);
                        });
                    } else {
                        setMentionList([]);
                    }

                    if (!e.repeat) {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();

                            if (content.replace(/\s/g, "").length === 0) return;

                            sendMessage(content.trim());
                            console.log(content.trim())

                            editor.clearContent();
                            setContent("");
                        }
                    }
                }}
                onLeafChange={e => {
                    if (!editor) setEditor(e);

                    setContent(e.children.map(object => object.children[0].text).join("\n"));
                }}
            />
        </div>
    )
});