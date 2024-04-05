/**
 * @file The Inventory view. This view is responsible for displaying the user's item inventory.
 * **This view is in progress!**
*/

import { Navigate } from "react-router-dom";
import { useUser } from "@stores/UserStore";
import { SidebarBody, PageHeader } from "@components";

/**
 * The Inventory view.   
 * **This view is in progress!**
 * @returns {JSX.Element} The Inventory view.
 */
export default function Inventory() {
    const { user } = useUser();

    if (!user) return <Navigate to="/login" />;

    return (<SidebarBody>
        <PageHeader>Inventory</PageHeader>
    </SidebarBody>)
}
