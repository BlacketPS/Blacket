import { Navigate } from "react-router-dom";
import { useLoading } from "@stores/LoadingStore";
import { useUser } from "@stores/UserStore";
import { packs } from "@stores/PackStore";
import { blooks } from "@stores/BlookStore";
import { SidebarBody, PageHeader } from "@components";
import { MInstantOpen } from "@components/Market";

export default function Market() {
    const { setLoading } = useLoading();
    const { user } = useUser();

    if (!user) return <Navigate to="/login" />;

    return (<SidebarBody>
        <PageHeader>Market</PageHeader>

        <MInstantOpen />
    </SidebarBody>)
}