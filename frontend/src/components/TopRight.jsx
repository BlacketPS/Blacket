import { useNavigate, Link } from "react-router-dom";
import { useUser } from "@stores/UserStore";
import useLogout from "@controllers/Authentication/useLogout";
import styles from "@styles";

export default function TopRight() {
    const navigate = useNavigate();

    const { user } = useUser();

    const logout = useLogout();

    return (
        <div className={styles.topRightContainer.container}>
            <div className={styles.topRightContainer.userContainer}>
                <div className={styles.topRightContainer.userLeft}>
                    <img src={user.avatar === null ? "/content/blooks/Default.png" : user.avatar} draggable={false} />

                    <div className={
                        user.color === "rainbow" && styles.textFormatting.rainbow
                    }>{user.username}</div>
                </div>

                <i className={`${styles.topRightContainer.userDropdownIcon} fas fa-angle-down`} />
                
                <div className={styles.topRightContainer.userDropdown}>
                    <Link to="/settings"><i className="fas fa-cog" /> Settings</Link>
                    <Link onClick={() => logout() && navigate("/login")}><i className="fas fa-sign-out-alt" /> Logout</Link>
                </div>
            </div>
        </div>
    )
}