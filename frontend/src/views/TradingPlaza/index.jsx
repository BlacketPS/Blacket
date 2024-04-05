/**
 * @file The Trading Plaza view. This view is responsible for displaying the trading plaza page.
 * **This view is in progress!**
*/

import { Navigate } from "react-router-dom";
import { useUser } from "@stores/UserStore";
import { SidebarBody, PageHeader } from "@components";

/**
 * The Trading Plaza view. The trading plaza allows users to trade items with other users.   
 * **This view is in progress!**
 * @returns {JSX.Element} The Trading Plaza view.
 */
export default function TradingPlaza() {
    // Get the user from the user store.
    const { user } = useUser();

    // If the user is not logged in, redirect them to the login page.
    if (!user) return <Navigate to="/login" />;

    return (<SidebarBody>
        <PageHeader>Trading Plaza</PageHeader>
    </SidebarBody>)
}
