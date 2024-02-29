import { Navigate } from "react-router-dom";
import { useUser } from "@stores/UserStore";
import { SidebarBody, PageHeader } from "@components";

export default function AuctionHouse() {
    const { user } = useUser();

    if (!user) return <Navigate to="/login" />;

    return (<SidebarBody>
        <PageHeader>Auction House</PageHeader>
    </SidebarBody>)
}
