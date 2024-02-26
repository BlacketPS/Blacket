import { Link } from "react-router-dom";
import { useUser } from "@stores/UserStore";
import { useModal } from "@stores/ModalStore";
import { LogoutModal } from "@components/Modals/TopRight";
import styles from "@styles";

export default function UserDropdown() {
    const { user } = useUser();
    const { createModal } = useModal();

    return (
        <div className={styles.topRight.userContainer}>
            <div className={styles.topRight.userLeft}>
                <img src={user.avatar === null ? "/content/blooks/Default.png" : user.avatar} draggable={false} />

                <div className={
                    user.color === "rainbow" ? styles.textFormatting.rainbow : ""
                } style={{ color: user.color }}>{user.username}</div>
            </div>

            <i className={`${styles.topRight.userDropdownIcon} fas fa-angle-down`} />

            <div className={styles.topRight.userDropdown}>
                <Link to="/settings"><i className="fas fa-cog" /> Settings</Link>
                <Link to="/login" onClick={e => {
                    e.preventDefault();
                    createModal(<LogoutModal />)
                }}><i className="fas fa-sign-out-alt" /> Logout</Link>
            </div>
        </div>
    )
}