/**
 * @file The AuctionHouse view. The auction house allows for bidding on items.
 * **This view is a placeholder and will be filled in later.**
 */

import { Navigate } from "react-router-dom";
import { useUser } from "@stores/UserStore";
import { SidebarBody, PageHeader } from "@components";

/**
 * The AuctionHouse view. The auction house allows for bidding on items.   
 * **This view is a placeholder and will be filled in later.**
 * @returns {JSX.Element} The AuctionHouse view.
 */
export default function AuctionHouse() {
    const { user } = useUser();

    if (!user) return <Navigate to="/login" />;

    return (<SidebarBody>
        <PageHeader>Auction House</PageHeader>
    </SidebarBody>)
}
