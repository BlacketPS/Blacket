import { useState } from "react";
import { useMessages } from "@stores/MessageStore";
import { UsersTypingContainer } from "@components/Chat";
import MarkdownPreview from "./MarkdownPreview";
import styles from "@styles";

export default function InputContainer({ placeholder, maxLength }) {
    const { sendMessage, startTyping, usersTyping } = useMessages();

    const [editor, setEditor] = useState(null);
    const [content, setContent] = useState("");

    return (
        <div className={styles.chat.messageForm}>
            <UsersTypingContainer usersTyping={usersTyping} />

            <MarkdownPreview
                className={styles.chat.messageInput}
                placeholder={placeholder}
                spellCheck
                autoFocus
                onInput={() => startTyping()}
                onKeyPress={e => {
                    console.log(content);

                    if (!e.repeat) {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();

                            if (content.replace(/\s/g, "").length === 0) return;

                            sendMessage(content.trim());

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
}