import { memo, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import timestamps from "@functions/timestamps";
import MarkdownPreview from "./MarkdownPreview";
import styles from "@styles";

import { useMessages } from "@stores/MessageStore";
import { useSpring, animated } from "react-spring";
import { useDrag } from "@use-gesture/react";

export default memo(function ChatMessage({ id, author, newUser, createdAt, replyingTo, mentionsMe, isSending, messageContextMenu, userContextMenu, children }) {
    if (!messageContextMenu || isSending) messageContextMenu = () => { };
    if (!userContextMenu || isSending) userContextMenu = () => { };

    const { setReplyingTo } = useMessages();
    const messagePosition = useSpring({ x: 0 });
    const bindMessage = useDrag((params) => {
        if (window.innerWidth > 850) return;
        if (params.dragging) {

            // if (params.movement[0] <= -100) setAllowReply(true);
            // else setAllowReply(false);

            if (params.movement[0] < 0 && params.movement[0] > -115) {
                messagePosition.x.set(params.movement[0]);
            }
        } else {
            if (messagePosition.x.get() <= -90) setReplyingTo({ id, author, content: children });
            // setAllowReply(false)
            messagePosition.x.start(0);
        }
    });

    const messageRef = useRef(null);
    const [messageHeight, setMessageHeight] = useState(0);
    const [badges, setBadges] = useState([]);

    useEffect(() => {
        if (messageRef.current) setMessageHeight(messageRef.current.clientHeight);
    }, [messageRef]);

    return <animated.span ref={messageRef} {...bindMessage()} className={styles.chat.messageHolder} style={{
        marginTop: (newUser || replyingTo) ? "15px" : "",
        touchAction: "none",
        backgroundColor: messagePosition.x.to([0, -115], ["rgba(0,0,0, 0)", "rgba(0,0,0, 0.3)"])
    }}>

        <animated.i className={`${styles.chat.replyIcon} fas fa-reply`} style={{
            height: messageHeight >= 75 ? "30px" : `${Math.floor(messageHeight * 0.5)}px`,
            width: messageHeight >= 75 ? "30px" : `${Math.floor(messageHeight * 0.5)}px`,
            fontSize: messageHeight >= 75 ? "20px" : `${Math.floor(messageHeight * 0.4)}px`,
            right: messagePosition.x.to([0, -115], ["-50px", "20px"]),
            transform: messagePosition.x.to([0, -115], ["translateY(-50%) rotate(180deg)", "translateY(-50%) rotate(0deg)"])
        }} />

        <animated.li className={`${styles.chat.message} ${mentionsMe ? `${styles.chat.mention}` : ""}`}
            style={{
                x: messagePosition.x,
                backgroundColor: messagePosition.x.to([0, -115], ["rgba(0,0,0, 0)", "rgba(0,0,0, 0.3)"]),
                borderRadius: messagePosition.x.to([0, -115], ["0", "5px"])
            }}
            data-message-id={id}
            onContextMenu={e => e.preventDefault() || messageContextMenu(e)}
        >

            {replyingTo && <div className={styles.chat.replyingTo} onClick={() => {
                const message = document.querySelector(`[data-message-id="${replyingTo.id}"]`);

                if (message) message.scrollIntoView({ behavior: "smooth", block: "center" });

                message.classList.add(styles.chat.highlightedMessage);
                setTimeout(() => message.classList.remove(styles.chat.highlightedMessage), 1500);
            }}>
                <img src="/content/replyingToArrow.png" />

                <img src={replyingTo.author.avatar === null ? "/content/blooks/Default.png" : replyingTo.author.avatar} className={styles.chat.replyingToAvatar} />

                <div className={`
                        ${styles.chat.replyingToUsername}
                        ${replyingTo.author.color === "rainbow" ? styles.textFormatting.rainbow : ""}
                    `} style={{ color: replyingTo.author.color }}>{replyingTo.author.username}</div>
                <i className="fas fa-circle" style={{ fontSize: "0.2rem" }} />

                <MarkdownPreview content={`${replyingTo.content.split("\n")[0]}${replyingTo.content.split("\n").length > 1 ? "..." : ""}`} readOnly={true} />
            </div>}

            <div className={styles.chat.messageContainer}>
                {(newUser || replyingTo) && <Link to={`/dashboard?name=${author.username}`} className={`${styles.chat.messageAvatarContainer} ${styles.chat.messageAvatar}`} onClick={e => {
                    if (window.innerWidth <= 850) e.preventDefault();
                }} onContextMenu={e => e.preventDefault() || e.stopPropagation() || userContextMenu(e)}>
                    <img className={styles.chat.avatar} src={author.avatar === null ? "/content/blooks/Default.png" : author.avatar} />
                </Link>}

                <div className={styles.chat.messageContentContainer}>
                    {(newUser || replyingTo) && <div className={styles.chat.usernameContainer} onContextMenu={e => e.preventDefault() || e.stopPropagation() || userContextMenu(e)}>
                        <Link to={`/dashboard?name=${author.username}`} className={`
                        ${styles.chat.messageUsername}
                        ${author.color === "rainbow" ? styles.textFormatting.rainbow : ""}
                    `} style={{ color: author.color }} onClick={e => {
                                if (window.innerWidth <= 850) e.preventDefault();
                            }}>
                            {author.username}
                        </Link>

                        <div className={styles.chat.messageBigTimestamp}>
                            {timestamps(createdAt)}
                        </div>

                        {badges.length > 0 && <div className={styles.chat.messageBadgeContainer}>
                            {badges.map((badge, index) => <img key={index} src={badge} className={styles.chat.messageBadge} />)}
                        </div>}
                    </div>}

                    <div style={{ opacity: isSending ? 0.5 : "" }} className={styles.chat.messageContent}>
                        {!(newUser || replyingTo) && <div className={styles.chat.messageSmallTimestamp}>
                            {new Date(createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>}

                        <MarkdownPreview content={children} readOnly={true} />
                    </div>
                </div>
            </div>
        </animated.li>
    </animated.span>
});