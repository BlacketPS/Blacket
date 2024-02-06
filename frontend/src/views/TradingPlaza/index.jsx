import { Navigate } from "react-router-dom";
import { useUser } from "@stores/UserStore";
import { SidebarBody, PageHeader } from "@components";

export default function TradingPlaza() {
    const { user } = useUser();

    if (!user) return <Navigate to="/login" />;
    else return (<SidebarBody>
        <PageHeader>Trading Plaza</PageHeader>
    </SidebarBody>)
}
