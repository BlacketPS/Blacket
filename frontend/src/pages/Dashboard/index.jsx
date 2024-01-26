import { useEffect, useState } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import { useLoading } from "@stores/LoadingStore";
import { useUser } from "@stores/UserStore";
import { useUsers } from "@controllers/users";
import { SidebarBody } from "@components";
import { GenericButton } from "@components/Buttons";

export default function Dashboard() {
    const [searchParams] = useSearchParams();

    const [viewingUser, setViewingUser] = useState(null);

    const getUser = useUsers();

    const { setLoading } = useLoading();
    const { user } = useUser();

    useEffect(() => {
        if (searchParams.get("name")) {
            setLoading(true);
            getUser(searchParams.get("name")).then(res => {
                if (res.id !== user.id) setViewingUser(res);
            }).catch(() => setViewingUser(null)).finally(() => setLoading(false));
        }
    }, []);

    if (!user) return <Navigate to="/login" />;
    /*else return (
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
    )*/
    else return (<SidebarBody>
        <h1>Dashboard (will be changed)</h1>
        {viewingUser ? JSON.stringify(viewingUser) : JSON.stringify(user)}
        {viewingUser && <GenericButton onClick={() => setViewingUser(null)}>Go Back</GenericButton>}
    </SidebarBody>)
}
