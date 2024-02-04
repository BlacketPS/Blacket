import { Navigate } from "react-router-dom";
import { useUser } from "@stores/UserStore";
import { SidebarBody, PageHeader } from "@components";

export default function TradingPlaza() {
    const { user } = useUser();

    if (!user) return <Navigate to="/login" />;
    else return (<SidebarBody>
        <PageHeader>Trading Plaza</PageHeader>
        <video width={2000} height={2000} autoPlay autoFocus loop>
            <source src="https://cdn.discordapp.com/attachments/1006388186957754408/1203525624254435328/2022-03-22_17-10-06_1.mp4?ex=65d16995&is=65bef495&hm=63e41608df17d9c5c93f63933a1188298a6e6158935278a011cb7e15226147f8&" />
        </video>
    </SidebarBody>)
}
