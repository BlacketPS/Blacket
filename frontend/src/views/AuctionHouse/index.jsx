/**
 * @file The AuctionHouse view. The auction house allows for bidding on items.
 */

import { Navigate } from "react-router-dom";
import { useUser } from "@stores/UserStore";
import { SidebarBody, PageHeader } from "@components";

/**
 * The AuctionHouse view. The auction house allows for bidding on items.
 * @returns {JSX.Element} The AuctionHouse view.
 */
export default function AuctionHouse() {
    // Get the user who is currently logged in.
    const { user } = useUser();

    // If the user is not logged in, redirect them to the login page.
    if (!user) return <Navigate to="/login" />;

    return (<SidebarBody>
        <PageHeader>Auction House</PageHeader>
    </SidebarBody>)
}
