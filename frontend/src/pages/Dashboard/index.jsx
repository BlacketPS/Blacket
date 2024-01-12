import { Navigate } from "react-router-dom";
import { useUser } from "@stores/UserStore";
import Background from "@components/Background";
import Sidebar from "@components/Sidebar";
import TopRight from "@components/TopRight";
import styles from "@styles";

export default function Dashboard() {
    document.title = `Dashboard | ${import.meta.env.VITE_INFORMATION_NAME}`;

    const { user } = useUser();

    if (!user) return <Navigate to="/login" />;
    else return (
        <>
            <Background />

            <Sidebar />

            <TopRight />

            <div className={styles.all.sidebarBody}>
                <div className={styles.dashboard.container}>
                    <div className={styles.dashboard.top}>
                        <div className={styles.dashboard.topLeft}>
                            <div className={styles.dashboard.topLeftInside}>
                                <div className={styles.dashboard.topLeftAvatarContainer}>
                                    <div className={styles.dashboard.topLeftAvatarContainerInside}>
                                        <img src={user.avatar === null ? "/content/blooks/Default.png" : user.avatar} draggable={false} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}