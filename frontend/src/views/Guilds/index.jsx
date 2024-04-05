/**
 * @file The Guilds view. This view is responsible for displaying the guild discovery page.
 * **This view is in progress!**
 */

import { Navigate } from "react-router-dom";
import { useUser } from "@stores/UserStore";
import { SidebarBody, PageHeader } from "@components";

/**
 * The Guilds view.   
 * **This view is in progress!**
 * @returns {JSX.Element} The Guilds view.
 */
export default function Guilds() {
    const { user } = useUser();

    if (!user) return <Navigate to="/login" />;

    return (<SidebarBody>
        <PageHeader>Guild Discovery</PageHeader>
    </SidebarBody>)
}
