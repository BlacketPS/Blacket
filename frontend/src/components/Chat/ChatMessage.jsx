import { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import timestamps from "@functions/timestamps";
import MarkdownPreview from "./MarkdownPreview";
import styles from "@styles";

export default memo(function ChatMessage({ id, author, newUser, createdAt, replyingTo, mentionsMe, isSending, messageContextMenu, userContextMenu, children }) {
    if (!messageContextMenu || isSending) messageContextMenu = () => { };
    if (!userContextMenu || isSending) userContextMenu = () => { };

    const [badges, setBadges] = useState([]);

    useEffect(() => {
        console.log(replyingTo);
    }, [replyingTo]);

    return (
        <li className={`${styles.chat.message} ${mentionsMe ? `${styles.chat.mention}` : ""}`}
            style={{ marginTop: (newUser || replyingTo) ? "15px" : "" }}
            data-message-id={id}
            data-reply-id={replyingTo ? replyingTo.id : null}
            onContextMenu={e => e.preventDefault() || messageContextMenu(e)}
            onMouseEnter={e => {
                const replyId = e.currentTarget.getAttribute("data-reply-id");
                const message = document.querySelector(`[data-message-id="${replyId}"]`);
                message.classList.add(styles.chat.replyingToMessage);
            }}
            onMouseLeave={e => {
                const replyId = e.currentTarget.getAttribute("data-reply-id");
                const message = document.querySelector(`[data-message-id="${replyId}"]`);
                message.classList.remove(styles.chat.replyingToMessage);
            }}
        >
            {replyingTo && <div className={styles.chat.replyingTo}>
                <img src="/content/replyingToArrow.png" />

                <img src={replyingTo.author.avatar === null ? "/content/blooks/Default.png" : replyingTo.author.avatar} className={styles.chat.replyingToAvatar} />

                <div className={`
                        ${styles.chat.replyingToUsername}
                        ${replyingTo.author.color === "rainbow" ? styles.textFormatting.rainbow : ""}
                    `} style={{ color: author.color }}>{replyingTo.author.username}</div>
                <i className="fas fa-circle" style={{ fontSize: "0.2rem" }} />

                <MarkdownPreview content={`${replyingTo.content.split("\n")[0]}${replyingTo.content.split("\n").length > 1 ? "..." : ""}`} readOnly={true} onClick={() => {
                    const message = document.querySelector(`[data-message-id="${replyingTo.id}"]`);

                    if (message) message.scrollIntoView({ behavior: "smooth" });
                }} />
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

                        <div className={styles.chat.messageTimestamp}>
                            {timestamps(createdAt)}
                        </div>

                        {badges.length > 0 && <div className={styles.chat.messageBadgeContainer}>
                            {badges.map((badge, index) => <img key={index} src={badge} className={styles.chat.messageBadge} />)}
                        </div>}
                    </div>}

                    <div style={{ opacity: isSending ? 0.5 : "" }} className={styles.chat.messageContent}>
                        <MarkdownPreview content={children} readOnly={true} />
                    </div>
                </div>
            </div>
        </li >
    )
});