import { memo, useState } from "react";
import { Link } from "react-router-dom";
import styles from "@styles";

export default memo(function ChatMessage({ author, newUser, isSending, children }) {
    const [badges, setBadges] = useState([
    ]);

    return (
        <li className={styles.chat.message} style={{ marginTop: newUser ? "15px" : "" }}>
            {newUser && <div>
                <div className={`${styles.chat.messageAvatarContainer} ${styles.chat.messageAvatar}`}>
                    <img className={styles.chat.avatar} src={author.avatar === null ? "/content/blooks/Default.png" : author.avatar} />
                </div>
            </div>}

            <div>
                <div className={styles.chat.usernameContainer}>
                    {newUser && <>
                        <Link to={`/dashboard?name=${author.username}`} className={`
                            ${styles.chat.messageUsername}
                            ${author.color === "rainbow" ? styles.textFormatting.rainbow : ""}
                        `} style={{ color: author.color }} onClick={e => {
                            if (window.innerWidth <= 850) e.preventDefault();
                        }}>
                            {author.username}
                        </Link>

                        <div className={styles.chat.messageBadgeContainer}>
                            {badges.map((badge, index) => {
                                return <img key={index} src={badge} className={styles.chat.messageBadge} />
                            })}
                        </div>
                    </>}
                </div>
                <div style={{ opacity: isSending ? 0.5 : "" }} className={styles.chat.messageContent}>{children}</div>
            </div>
        </li>
    )
});