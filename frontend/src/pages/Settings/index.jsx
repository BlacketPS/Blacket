import { Navigate } from "react-router-dom";
import { useUser } from "@stores/UserStore";
import { SidebarBody } from "@components";

export default function Settings() {
    const { user } = useUser();

    if (!user) return <Navigate to="/login" />;
    else return (<SidebarBody>
        <h1>Settings</h1>
    </SidebarBody>)
}
