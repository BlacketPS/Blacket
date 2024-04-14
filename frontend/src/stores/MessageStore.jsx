import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "@stores/SocketStore";
import { useUser } from "@stores/UserStore";

const MessageStoreContext = createContext();

export function useMessages() {
    return useContext(MessageStoreContext);
}

export function MessageStoreProvider({ children }) {
    const { connected, socket } = useSocket();
    const { user, setUser } = useUser();

    const [messages, setMessages] = useState([]);
    const [replyingTo, setReplyingTo] = useState(null);
    const [usersTyping, setUsersTyping] = useState([]);
    const [typingTimeout, setTypingTimeout] = useState(null);

    const fetchMessages = async (room) => await fetch.get(`/api/messages/${room}`).then(res => setMessages(res.data.messages)).catch(err => err);

    const sendMessage = (content) => {
        const nonce = ((Math.floor(Date.now() / 1000).toString()) + Math.floor(1000000 + Math.random() * 9000000)).toString();

        setMessages(previousMessages => [{ id: nonce, author: user, content, mentions: [], replyingTo, createdAt: new Date(Date.now()).toISOString(), nonce }, ...previousMessages]);

        socket.emit("messages-send", { content, replyingTo: replyingTo ? parseInt(replyingTo.id) : null, nonce });

        setTypingTimeout(null);
        setReplyingTo(null);
    }

    const startTyping = () => {
        if (typingTimeout && Date.now() - typingTimeout < 2000) return;

        socket.emit("messages-start-typing", {});

        setTypingTimeout(Date.now());
    }

    useEffect(() => {
        if (!connected) return;

        if (!user || user.initialized) return;

        fetchMessages(0);

        socket.on("messages-create", (data) => {
            if (data.message.mentions.includes(user.id) || (data.message.replyingTo && data.message.replyingTo.author.id === user.id)) new Audio("/content/mention.ogg").play();

            if (data.message.author.id === user.id) return;

            setMessages(previousMessages => [data.message, ...previousMessages]);
            setUsersTyping(previousUsersTyping => previousUsersTyping.filter(user => user.id !== data.message.author.id));
        });

        socket.on("messages-send", (data) => setMessages(previousMessages => previousMessages.map(message => message.nonce === data.nonce ? { ...message, id: data.id, mentions: data.mentions, nonce: undefined } : message)));

        socket.on("messages-typing-started", (data) => setUsersTyping(previousUsersTyping => {
            if (data.user.id === user.id) return previousUsersTyping;

            data.user.startedTypingAt = Date.now();

            if (previousUsersTyping.some(user => user.id === data.user.id)) return previousUsersTyping.map(user => user.id === data.user.id ? data.user : user);

            return [...previousUsersTyping, data.user];
        }));

        const typingInterval = setInterval(() => setUsersTyping(previousUsersTyping => previousUsersTyping.filter(user => Date.now() - user.startedTypingAt < 2500)), 1000);

        setUser({ ...user, initialized: true });

        return () => {
            /* socket.off("messages-create");
            socket.off("messages-send");
            socket.off("messages-typing-started"); */

            clearInterval(typingInterval);
            clearTimeout(typingTimeout);
        }
    }, [connected, user]);

    return <MessageStoreContext.Provider value={{
        messages, usersTyping, replyingTo, setReplyingTo,
        fetchMessages, sendMessage, startTyping
    }}>{children}</MessageStoreContext.Provider>;
}
