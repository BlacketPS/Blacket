import { Navigate } from "react-router-dom";
import { useUser } from "@stores/UserStore";
import { SidebarBody, PageHeader } from "@components";

export default function Inventory() {
    const { user } = useUser();

    if (!user) return <Navigate to="/login" />;

    return (<SidebarBody>
        <PageHeader>Inventory</PageHeader>
    </SidebarBody>)
}
