import { Link } from "react-router-dom";
import { Textfit } from "react-textfit";
import cardinalToOrdinal from "@functions/cardinalToOrdinal";
import styles from "@styles";

export default function Placement({ placement, user }) {
    return (
        <Link to={`/dashboard?name=${user.username}`} className={styles.leaderboard.otherStandingHolder}>
            <div className={styles.leaderboard.otherStandingContainer}>
                <div className={styles.leaderboard.otherStandingPlace}>{placement}</div>
                <div className={styles.leaderboard.otherStandingSuffix}>
                    {cardinalToOrdinal(placement)}
                </div>

                <div className={styles.leaderboard.otherStandingAvatar}>
                    <img src={user.avatar === null ? "/content/blooks/Default.png" : user.avatar} draggable={false} />
                </div>

                <div className={styles.leaderboard.otherStandingUsername}>
                    <Textfit className={
                        user.color === "rainbow" && styles.textFormatting.rainbow
                    } style={{ color: user.color }} max={36} mode="single">{user.username}</Textfit>
                </div>

                <div className={styles.leaderboard.otherStandingScore}>
                    {user.tokens.toLocaleString()}
                </div>
            </div>
        </Link>
    )
}