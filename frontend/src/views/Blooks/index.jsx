/**
 * @file Defines the Blooks view. This view allows for viewing and selling blooks.
*/

import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "@stores/UserStore";
import { useModal } from "@stores/ModalStore";
import { packs } from "@stores/PackStore";
import { blooks } from "@stores/BlookStore";
import { ErrorModal } from "@components/Modals";
import { SellBlooksModal } from "@components/Modals/Blooks";
import { SidebarBody } from "@components";
import { BlooksHolder, SetHolder, Blook, RightBlook, RightButtonContainer, RightButton } from "@components/Blooks";

/**
 * The Blooks view. This view allows for viewing and selling blooks.
 * @returns {JSX.Element} The Blooks component.
 */
export default function Blooks() {
    // Be able to create modals.
    const { createModal } = useModal();
    // Get the current user information.
    const { user } = useUser();

    // If the user is not logged in, redirect them to the login page.
    if (!user) return <Navigate to="/login" />;

    // View and set the selected blook. Initially, set it to a random blook.
    const [selectedBlook, setSelectedBlook] = useState(Object.keys(user.blooks)[Math.floor(Math.random() * Object.keys(user.blooks).length)])

    useEffect(() => {
        // If there are no blooks, display an error and go back.
        if (blooks.length < 1) return createModal(<ErrorModal>This server has no blooks.</ErrorModal>) && history.back();
    }, []);

    // Get every blook from every pack.
    const packBlooks = packs.map(pack => pack.blooks).flat();

    return (<SidebarBody>
        <BlooksHolder>
            {packs.map(pack => <SetHolder key={pack.id} name={`${pack.name} Pack`}>
                {pack.blooks.map(blook => <Blook key={blook} blook={blook} locked={!user.blooks[blook]} quantity={user.blooks[blook]} onClick={() => setSelectedBlook(blook)} />)}
            </SetHolder>)}

            {Object.keys(user.blooks).filter(blook => !packBlooks.includes(blook)).length > 0 && <SetHolder name="Miscellaneous">
                {Object.keys(user.blooks).filter(blook => !packBlooks.includes(blook)).map(blook => <Blook key={blook} blook={blook} locked={!user.blooks[blook]} quantity={user.blooks[blook]} onClick={() => setSelectedBlook(blook)} />)}
            </SetHolder>}
        </BlooksHolder>

        {Object.keys(user.blooks).length > 0 && <RightBlook blook={selectedBlook} owned={user.blooks[selectedBlook]} />}

        {Object.keys(user.blooks).length > 0 && <RightButtonContainer>
            <RightButton onClick={() => createModal(<SellBlooksModal blook={selectedBlook} />)}>Sell</RightButton>
        </RightButtonContainer>}
    </SidebarBody>)
}