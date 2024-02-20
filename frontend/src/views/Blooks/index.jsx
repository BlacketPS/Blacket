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

export default function Blooks() {
    const { createModal } = useModal();
    const { user } = useUser();

    if (!user) return <Navigate to="/login" />;

    const [selectedBlook, setSelectedBlook] = useState(Object.keys(user.blooks)[Math.floor(Math.random() * Object.keys(user.blooks).length)])

    useEffect(() => {
        if (blooks.length < 1) return createModal(<ErrorModal>This server has no blooks.</ErrorModal>) && history.back();
    }, []);

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