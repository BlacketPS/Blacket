/**
 * @file The message store provider and hook.
 */

import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "@stores/SocketStore";
import { useUser } from "@stores/UserStore";

// Create a context for the message store
const MessageStoreContext = createContext();

/**
 * The hook that allows components to interact with the message store.
 * 
 * @property {Array} messages The messages in the chat.
 * @property {Array} usersTyping The users currently typing.
 * @property {Object} replyingTo The message being replied to.
 * @property {Function} setReplyingTo The function to set the message being replied to.
 * @property {Function} fetchMessages The function to fetch the messages.
 * @property {Function} sendMessage The function to send a message.
 * @property {Function} startTyping The function to start typing.
 * 
 * @returns {Object} The message store context.
 */
export function useMessages() {
    return useContext(MessageStoreContext);
}

/**
 * The provider for the message store.
 * @param {Object} props The properties of the component.
 * @param {Object} props.children The children components.
 * @returns The message store provider.
 **/
export function MessageStoreProvider({ children }) {
    // Get the socket store
    const { socketOn, socketOff, socketEmit } = useSocket();
    // Get/set the current user
    const { user, setUser } = useUser();

    // Get/set the messages in the chat
    const [messages, setMessages] = useState([]);

    // Get/set the message being replied to
    const [replyingTo, setReplyingTo] = useState(null);

    // Get/set the users currently typing
    const [usersTyping, setUsersTyping] = useState([]);

    // Get/set the typing timeout
    const [typingTimeout, setTypingTimeout] = useState(null);

    // Fetch the messages in the chat
    const fetchMessages = async (room) => await fetch.get(`/api/messages/${room}`).then(res => setMessages(res.data.messages)).catch(err => err);

    // Send a message
    const sendMessage = (content) => {
        const nonce = ((Math.floor(Date.now() / 1000).toString()) + Math.floor(1000000 + Math.random() * 9000000)).toString();

        // Append the message to the messages array
        setMessages(previousMessages => [{ id: nonce, author: user, content, mentions: [], replyingTo, createdAt: new Date(Date.now()).toISOString(), nonce }, ...previousMessages]);

        // Emit the message to the server
        socketEmit("messages-send", { content, replyingTo: replyingTo ? parseInt(replyingTo.id) : null, nonce });

        // Reset all states
        setTypingTimeout(null);
        setReplyingTo(null);
    }

    // Start typing
    const startTyping = () => {
        if (typingTimeout && Date.now() - typingTimeout < 2000) return;

        // Emit that the user is typing to the server
        socketEmit("messages-start-typing", {});

        setTypingTimeout(Date.now());
    }

    useEffect(() => {
        // If the user is not logged in or the user is already initialized, prevent further execution
        if (!user || user.initialized) return;

        // Fetch the messages in the global channel at first
        fetchMessages(0);

        // When a message is created, add it to the messages array
        socketOn("messages-create", (data) => {
            if (data.message.mentions.includes(user.id) || (data.message.replyingTo && data.message.replyingTo.author.id === user.id)) new Audio("/content/mention.ogg").play();

            if (data.message.author.id === user.id) return;

            // If the message is a reply, add the message being replied to to the messages array. Otherwise, add the message to the messages array.
            setMessages(previousMessages => [data.message, ...previousMessages]);
            setUsersTyping(previousUsersTyping => previousUsersTyping.filter(user => user.id !== data.message.author.id));
        });

        // When a message is sent, update the message in the messages array
        socketOn("messages-send", (data) => setMessages(previousMessages => previousMessages.map(message => message.nonce === data.nonce ? { ...message, id: data.id, mentions: data.mentions, nonce: undefined } : message)));

        // When a user starts typing, add them to the users typing array
        socketOn("messages-typing-started", (data) => setUsersTyping(previousUsersTyping => {
            if (data.user.id === user.id) return previousUsersTyping;

            data.user.startedTypingAt = Date.now();

            if (previousUsersTyping.some(user => user.id === data.user.id)) return previousUsersTyping.map(user => user.id === data.user.id ? data.user : user);

            return [...previousUsersTyping, data.user];
        }));

        const typingInterval = setInterval(() => setUsersTyping(previousUsersTyping => previousUsersTyping.filter(user => Date.now() - user.startedTypingAt < 2500)), 1000);

        // Set the user as initialized
        setUser({ ...user, initialized: true });

        // Clean up the event listeners and intervals
        return () => {
            socketOff("messages-create");
            socketOff("messages-send");
            socketOff("messages-typing-started");

            clearInterval(typingInterval);
            clearTimeout(typingTimeout);
        }
    }, [user]);

    return <MessageStoreContext.Provider value={{
        messages, usersTyping, replyingTo, setReplyingTo,
        fetchMessages, sendMessage, startTyping
    }}>{children}</MessageStoreContext.Provider>;
}