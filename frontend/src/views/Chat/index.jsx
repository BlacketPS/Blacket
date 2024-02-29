import { useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "@stores/UserStore";
import { useMessages } from "@stores/MessageStore";
import { useContextMenu } from "@stores/ContextMenuStore";
import { ChatContainer, ChatMessagesContainer, ChatMessage, InputContainer } from "@components/Chat";
import { SidebarBody } from "@components";
import styles from "@styles";

export default function Chat() {
    const { user } = useUser();
    const { messages } = useMessages();
    const { openContextMenu } = useContextMenu();

    if (!user) return <Navigate to="/login" />;

    return (<SidebarBody>
        <ChatContainer>
            <ChatMessagesContainer>
                {messages.map(message => <ChatMessage
                    key={message.id}
                    author={message.author}
                    newUser={!(messages[messages.indexOf(message) + 1] && messages[messages.indexOf(message) + 1].author.id === message.author.id)}
                    mentionsMe={message.mentions.includes(user.id)}
                    isSending={message.nonce}
                    messageContextMenu={e => {
                        console.log("message context menu");

                        openContextMenu([
                            { label: "Edit", icon: "fas fa-edit", onClick: () => console.log("edit") },
                            { label: "Reply", icon: "fas fa-reply", onClick: () => console.log("reply") },
                            { label: "Copy Text", icon: "fas fa-copy", onClick: () => navigator.clipboard.writeText(message.content)},
                            { label: "Report", icon: "fas fa-flag", onClick: () => console.log("report") },
                            { label: "Delete", icon: "fas fa-trash", onClick: () => console.log("delete") },
                            { divider: true },
                            { label: "Copy Raw Message", icon: "fas fa-copy", onClick: () => navigator.clipboard.writeText(JSON.stringify(message)) },
                            { label: "Copy Message ID", icon: "fas fa-copy", onClick: () => navigator.clipboard.writeText(message.id) }
                        ]);
                    }}
                    userContextMenu={e => {
                        console.log("user context menu");

                        openContextMenu([
                            { label: "Send Message", icon: "fas fa-paper-plane", onClick: () => console.log("send message") },
                            { label: "Mention", icon: "fas fa-at", onClick: () => console.log("mention") },
                            { label: "View Profile", icon: "fas fa-user", onClick: () => console.log("view profile") },
                            { label: "Report", icon: "fas fa-flag", onClick: () => console.log("report") },
                            { label: "Block", icon: "fas fa-ban", onClick: () => console.log("block") },
                            { divider: true },
                            { label: "Copy User ID", icon: "fas fa-copy", onClick: () => navigator.clipboard.writeText(message.author.id) }
                        ]);
                    }}
                >
                    {message.content}
                </ChatMessage>)}
            </ChatMessagesContainer>

            <InputContainer placeholder="Message #global" maxLength={2048} />
        </ChatContainer>
    </SidebarBody>)
}