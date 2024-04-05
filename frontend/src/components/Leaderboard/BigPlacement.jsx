import { Link } from "react-router-dom";
import { Textfit } from "react-textfit";
import cardinalToOrdinal from "@functions/cardinalToOrdinal";
import styles from "@styles";

/**
 * The big (1st, 2nd, 3rd) placement component.
 * @param {Object} props The properties for this component.
 * @param {String} props.type The type of the placement.
 * @param {Number} props.placement The placement number.
 * @param {Object} props.user The user object.
 * @returns {JSX.Element} The big placement component.
 */
export default function BigPlacement({ type, placement, user }) {
    // The numeral and corresponding word for each placement.
    const place = { 1: "One", 2: "Two", 3: "Three" }

    return (
        <Link to={`/dashboard?name=${user.username}`} className={styles.leaderboard[`placement${place[placement]}`]}>
            <div className={styles.leaderboard.placementInside}>
                <div className={styles.leaderboard[`username${place[placement]}`]}>
                    <Textfit className={
                        user.color === "rainbow" ? styles.textFormatting.rainbow : ""
                    } style={{ color: user.color }} max={100} mode="single">{user.username}</Textfit>
                </div>

                <div className={styles.leaderboard[`score${place[placement]}`]}>
                    <img src={`/content/${type === "tokens" ? "token" : "experience"}.png`} /> {user[type].toLocaleString()}
                </div>

                <div className={styles.leaderboard[`place${place[placement]}`]} >
                    <Textfit className={styles.leaderboard.placeText} max={85} mode="single">{placement}</Textfit>
                    <Textfit className={styles.leaderboard.placeSuffix} max={30} mode="single">{cardinalToOrdinal(placement)}</Textfit>
                </div>

                <div className={styles.leaderboard[`avatar${place[placement]}`]}>
                    <img src={user.avatar === null ? "/content/blooks/Default.png" : user.avatar} draggable={false} />
                </div>
            </div>
        </Link>
    )
}