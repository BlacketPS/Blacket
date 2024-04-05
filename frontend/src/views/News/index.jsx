/**
 * @file The News view. This view is responsible for displaying the news page.
 */

import { Navigate } from "react-router-dom";
import { useUser } from "@stores/UserStore";
import { SidebarBody, PageHeader } from "@components";

/**
 * The News view.
 * @returns {JSX.Element} The News view.
 */
export default function News() {
    // Get the user from the user store.
    const { user } = useUser();

    // If the user is not logged in, redirect them to the login page.
    if (!user) return <Navigate to="/login" />;

    return (<SidebarBody>
        <PageHeader>News</PageHeader>
    </SidebarBody>)
}
