import { memo, useState } from "react";
import { Link } from "react-router-dom";
import MarkdownPreview from "./MarkdownPreview";
import styles from "@styles";

export default memo(function ChatMessage({ author, newUser, mentionsMe, isSending, messageContextMenu, userContextMenu, children }) {
    if (!messageContextMenu) messageContextMenu = () => { };
    if (!userContextMenu) userContextMenu = () => { };

    const [badges, setBadges] = useState([]);

    return (
        <li className={`${styles.chat.message}${mentionsMe ? ` ${styles.chat.mention}` : ""}`} style={{ marginTop: newUser ? "15px" : "" }} onContextMenu={e => e.preventDefault() || messageContextMenu(e)}>
            {newUser && <div>
                <Link to={`/dashboard?name=${author.username}`} className={`${styles.chat.messageAvatarContainer} ${styles.chat.messageAvatar}`} onClick={e => {
                    if (window.innerWidth <= 850) e.preventDefault();
                }} onContextMenu={e => e.preventDefault() || e.stopPropagation() || userContextMenu(e)}>
                    <img className={styles.chat.avatar} src={author.avatar === null ? "/content/blooks/Default.png" : author.avatar} />
                </Link>
            </div>}

            <div>
                {newUser && <div className={styles.chat.usernameContainer} onContextMenu={e => e.preventDefault() || e.stopPropagation() || userContextMenu(e)}>
                    <Link to={`/dashboard?name=${author.username}`} className={`
                            ${styles.chat.messageUsername}
                            ${author.color === "rainbow" ? styles.textFormatting.rainbow : ""}
                        `} style={{ color: author.color }} onClick={e => {
                            if (window.innerWidth <= 850) e.preventDefault();
                        }}>
                        {author.username}
                    </Link>

                    {badges.length > 0 && <div className={styles.chat.messageBadgeContainer}>
                        {badges.map((badge, index) => <img key={index} src={badge} className={styles.chat.messageBadge} />)}
                    </div>}
                </div>}

                <div style={{ opacity: isSending ? 0.5 : "" }} className={styles.chat.messageContent}>
                    <MarkdownPreview content={children} readOnly={true} />
                </div>
            </div>
        </li >
    )
});