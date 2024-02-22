import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "@stores/UserStore";
import { useSocket } from "@stores/SocketStore";
import { SidebarBody } from "@components";
import styles from "@styles";

export default function Chat() {
    const { user } = useUser();
    const { socketOn, socketOff, socketEmit } = useSocket();

    const [messages, setMessages] = useState([]);
    const [messagesSending, setMessagesSending] = useState([]);

    if (!user) return <Navigate to="/login" />;

    useEffect(() => {
        socketOn("messages-create", (data) => setMessages(previousMessages => [data.message, ...previousMessages]));
        socketOn("messages-send", (data) => setMessagesSending(previousMessagesSending => previousMessagesSending.filter(message => message.nonce !== data.nonce)));

        return () => {
            socketOff("messages-create");
            socketOff("messages-send");
        }
    }, []);

    return (<SidebarBody>
        <div className={styles.chat.container}>
            <ul className={styles.chat.messages}>
                {messagesSending.length > 0 && messagesSending.map(sendingMessage => <li className={styles.chat.message}>
                    {messages.length > 0 && messages[messages.length - 1].author.id === user.id ? null : <>
                        <div>
                            <div className={`${styles.chat.messageAvatarContainer} ${styles.chat.messageAvatar}`}>
                                <img className={styles.chat.avatar} src={user.avatar === null ? "/content/blooks/Default.png" : user.avatar} />
                            </div>
                        </div>

                        <div className={styles.chat.messageUsername}>{user.username}</div>
                    </>}
                    <div style={{ opacity: 0.5 }} className={styles.chat.messageContent}>{sendingMessage.content}</div>
                </li>)}

                {messages.map(message => {
                    console.log(message);

                    return (
                        <li className={styles.chat.message}>
                            {messages[messages.indexOf(message) + 1] && messages[messages.indexOf(message) + 1].author.id === message.author.id ? null : <>
                                <div>
                                    <div className={`${styles.chat.messageAvatarContainer} ${styles.chat.messageAvatar}`}>
                                        <img className={styles.chat.avatar} src={message.author.avatar === null ? "/content/blooks/Default.png" : message.author.avatar} />
                                    </div>
                                </div><div className={styles.chat.messageUsername}>{message.author.username}</div>
                            </>}
                            <div className={styles.chat.messageContent}>{message.content}</div>
                        </li>
                    )
                })}
            </ul>

            <form className={styles.chat.messageForm} autoComplete="off" tabIndex={0} onSubmit={e => {
                e.preventDefault();

                const content = e.target[0].value;
                const nonce = Math.random().toString(36).substring(2, 18);

                console.log(nonce);

                setMessagesSending(prevMessagesSending => [...prevMessagesSending, { content, nonce }]);
                socketEmit("messages-send", { content, nonce });

                e.target[0].value = "";
            }}>
                <div className={styles.chat.messageInputContainer}>
                    <input className={styles.chat.messageInput} type="text" placeholder="Message..." maxLength={2000} tabIndex={0} />
                </div>
            </form>
        </div>
    </SidebarBody>)
}