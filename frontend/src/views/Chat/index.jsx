import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "@stores/UserStore";
import { useMessages } from "@stores/MessageStore";
import { useSocket } from "@stores/SocketStore";
import { ChatContainer, ChatMessagesContainer, ChatMessage } from "@components/Chat";
import { SidebarBody } from "@components";
import styles from "@styles";

export default function Chat() {
    const { user } = useUser();
    const { messages, usersTyping } = useMessages();
    const { socketEmit } = useSocket();

    if (!user) return <Navigate to="/login" />;

    const [typingTimeout, setTypingTimeout] = useState(null);

    const handleTyping = () => {
        if (typingTimeout && Date.now() - typingTimeout < 2000) return;

        socketEmit("messages-start-typing", {});

        setTypingTimeout(Date.now());
    }

    useEffect(() => {
        return () => {
            if (typingTimeout) clearTimeout(typingTimeout);
        }
    }, []);

    return (<SidebarBody>
        <ChatContainer>
            <ChatMessagesContainer>
                {messages.map(message => <ChatMessage key={message.id} author={message.author} newUser={
                    messages[messages.indexOf(message) + 1] && messages[messages.indexOf(message) + 1].author.id === message.author.id ? false : true
                }>{message.content}</ChatMessage>)}
            </ChatMessagesContainer>

            <form className={styles.chat.messageForm} autoComplete="off" tabIndex={0} onSubmit={e => {
                e.preventDefault();

                const content = e.target[0].value;
                const nonce = (Math.floor(Date.now() / 1000)).toString() + Math.floor(1000000 + Math.random() * 9000000).toString();

                if (content.replace(/\s/g, "").length === 0) return;

                e.target[0].value = "";

                socketEmit("messages-send", { content, nonce });
            }} onInput={handleTyping}>
                {usersTyping.length > 0 && <div className={styles.chat.usersTypingContainer}>
                    {usersTyping.length > 4 ? <b>{usersTyping.length} people are typing...</b> : <>
                        {usersTyping.sort((a, b) => b.username.localeCompare(a.username)).map((user, index) => <b key={user.id}>{user.username}{index === usersTyping.length - 1 ? "" : ", "}</b>)}
                        {usersTyping.length === 1 ? " is typing..." : " are typing..."}
                    </>}
                </div>}
                <div className={styles.chat.messageInputContainer}>
                    <input className={styles.chat.messageInput} type="text" placeholder="Message..." maxLength={2000} tabIndex={0} />
                </div>
            </form>
        </ChatContainer>
    </SidebarBody>)
}