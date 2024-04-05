/**
 * @file Defines the Credits view. This view allows for viewing the credits.
 */

import { Navigate } from "react-router-dom";
import { useUser } from "@stores/UserStore";
import { SidebarBody, PageHeader } from "@components";

/**
 * The Credits view. This view allows for viewing the credits.   
 * **This view is a placeholder and will be filled in later.**
 * @returns {JSX.Element} The Credits component.
 */
export default function Credits() {
    // Get the current user information.
    const { user } = useUser();

    // If the user is not logged in, redirect them to the login page.
    if (!user) return <Navigate to="/login" />;

    return (<SidebarBody>
        <PageHeader>Credits</PageHeader>
    </SidebarBody>)
}
