import { Link } from "react-router-dom";
import { Textfit } from "react-textfit";
import cardinalToOrdinal from "@functions/cardinalToOrdinal";
import styles from "@styles";

export default function BigPlacement({ placement, user }) {
    const place = { 1: "One", 2: "Two", 3: "Three" }

    return (
        <Link to={`/dashboard?name=${user.username}`} className={styles.leaderboard[`placement${place[placement]}`]}>
            <div className={styles.leaderboard.placementInside}>
                <div className={styles.leaderboard[`username${place[placement]}`]}>
                    <Textfit className={
                        user.color === "rainbow" && styles.textFormatting.rainbow
                    } style={{ color: user.color }} max={100} mode="single">{user.username}</Textfit>
                </div>

                <div className={styles.leaderboard[`score${place[placement]}`]}>
                    {user.tokens.toLocaleString()}
                </div>

                <div className={styles.leaderboard[`place${place[placement]}`]} >
                    <Textfit className={styles.leaderboard.placeText} max={85} mode="single">{placement}</Textfit>
                    <Textfit className={styles.leaderboard.placeSuffix} max={30} mode="single">
                        {cardinalToOrdinal(placement)}
                    </Textfit>
                </div>

                <div className={styles.leaderboard[`avatar${place[placement]}`]}>
                    <img src={user.avatar === null ? "/content/blooks/Default.png" : user.avatar} draggable={false} />
                </div>
            </div>
        </Link>
    )
}