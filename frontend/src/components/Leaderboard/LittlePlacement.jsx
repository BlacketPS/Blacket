import { Link, useNavigate } from "react-router-dom";
import { Textfit } from "react-textfit";
import cardinalToOrdinal from "@functions/cardinalToOrdinal";
import styles from "@styles";

export default function Placement({ type, placement, user }) {
    const navigate = useNavigate();

    return (
        <Link to={`/dashboard?name=${user.username}`} className={styles.leaderboard.otherStandingHolder} onClick={e => {
            if (window.innerWidth <= 850) return e.preventDefault();
        }}>
            <div className={styles.leaderboard.otherStandingContainer}>
                <div className={styles.leaderboard.otherStandingInside}>
                    <div className={styles.leaderboard.otherStandingPlace}>{placement}</div>
                    <div className={styles.leaderboard.otherStandingSuffix}>{cardinalToOrdinal(placement)}</div>

                    <div className={styles.leaderboard.otherStandingAvatar}>
                        <img src={user.avatar === null ? "/content/blooks/Default.png" : user.avatar} draggable={false} />
                    </div>

                    <div className={styles.leaderboard.otherStandingUsername}>
                        <Textfit className={
                            user.color === "rainbow" && styles.textFormatting.rainbow
                        } style={{ color: user.color }} max={36} mode="single">{user.username}</Textfit>
                    </div>

                    <div className={styles.leaderboard.otherStandingScore}>
                        {user[type].toLocaleString()} <img src={`/content/${type === "tokens" ? "token" : "experience"}.png`} />
                    </div>
                </div>

                <div className={styles.leaderboard.otherStandingBottomScores}>
                    <div className={styles.leaderboard.otherStandingBottomScore}>
                        <img src={`/content/${type === "tokens" ? "token" : "experience"}.png`} /> {user[type].toLocaleString()} {type === "tokens" ? "Tokens" : "EXP"}
                    </div>

                    <div className={styles.leaderboard.otherStandingBottomButton} onClick={() => navigate(`/dashboard?name=${user.username}`)}>View User</div>
                </div>
            </div>
        </Link >
    )
}