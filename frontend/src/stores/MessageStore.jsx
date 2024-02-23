import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "@stores/SocketStore";
import { useUser } from "@stores/UserStore";

const MessageStoreContext = createContext();

export function useMessages() {
    return useContext(MessageStoreContext);
}

export function MessageStoreProvider({ children }) {
    const { socketOn, socketOff } = useSocket();
    const { user } = useUser();

    const [messages, setMessages] = useState([]);
    const [usersTyping, setUsersTyping] = useState([]);

    const fetchMessages = async (room) => await fetch.get(`/api/messages/${room}`).then(res => setMessages(res.data.messages)).catch(err => err);

    useEffect(() => {
        fetchMessages(0);

        socketOn("messages-create", (data) => {
            setMessages(previousMessages => [data.message, ...previousMessages]);
            setUsersTyping(previousUsersTyping => previousUsersTyping.filter(user => user.id !== data.message.author.id));
        });

        socketOn("messages-send", (data) => setMessages(previousMessages => previousMessages.map(message => message.nonce === data.nonce ? data.message : message)));

        socketOn("messages-typing-started", (data) => setUsersTyping(previousUsersTyping => {
            if (data.user.id === user.id) return previousUsersTyping;

            data.user.startedTypingAt = Date.now();

            if (previousUsersTyping.some(user => user.id === data.user.id)) return previousUsersTyping.map(user => user.id === data.user.id ? data.user : user);

            return [...previousUsersTyping, data.user];
        }));

        const typingInterval = setInterval(() => setUsersTyping(previousUsersTyping => previousUsersTyping.filter(user => Date.now() - user.startedTypingAt < 2500)), 1000);

        return () => {
            socketOff("messages-create");
            socketOff("messages-send");
            socketOff("messages-typing-started");
            clearInterval(typingInterval);
        }
    }, []);

    return <MessageStoreContext.Provider value={{ messages, usersTyping, fetchMessages }}>{children}</MessageStoreContext.Provider>;
}