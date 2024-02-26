import { Navigate } from "react-router-dom";
import { useUser } from "@stores/UserStore";
import { useMessages } from "@stores/MessageStore";
import { ChatContainer, ChatMessagesContainer, ChatMessage, InputContainer } from "@components/Chat";
import { SidebarBody } from "@components";

export default function Chat() {
    const { user } = useUser();
    const { messages } = useMessages();

    if (!user) return <Navigate to="/login" />;

    return (<SidebarBody>
        <ChatContainer>
            <ChatMessagesContainer>
                {messages.map(message => <ChatMessage key={message.id} author={message.author} newUser={!(messages[messages.indexOf(message) + 1] && messages[messages.indexOf(message) + 1].author.id === message.author.id)} isSending={message.nonce}>
                    {message.content}
                </ChatMessage>)}
            </ChatMessagesContainer>

            <InputContainer placeholder="Message #global" maxLength={2048} />
        </ChatContainer>
    </SidebarBody>)
}