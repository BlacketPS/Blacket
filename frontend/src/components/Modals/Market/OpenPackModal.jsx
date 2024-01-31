import { useState } from "react";
import { Tooltip } from "react-tooltip";
import { useModal } from "@stores/ModalStore";
import { useUser } from "@stores/UserStore";
import { packs } from "@stores/PackStore";
import { blooks } from "@stores/BlookStore";
import { ModalHeader, ModalText, ModalButtons, ModalError } from "@components/Modals";
import { GenericButton } from "@components/Buttons";
import styles from "@styles";

export default function OpenPackModal({ pack }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { closeModal } = useModal();
    const { user } = useUser();

    if (user.tokens < packs.find(p => p.id === pack).price) return (<>
        <ModalHeader>Error</ModalHeader>

        <ModalText>You do not have enough tokens to purchase this pack.</ModalText>

        <ModalButtons>
            <GenericButton onClick={() => closeModal()}>Okay</GenericButton>
        </ModalButtons>
    </>)
    else return (<>
        <Tooltip id={pack} place="left" effect="solid">
            {packs.find(p => p.id === pack).blooks.map(blook => <div key={blook}>
                {blooks.find(b => b.id === blook).name}: {blooks.find(b => b.id === blook).chance}%
            </div>)}
        </Tooltip>

        <ModalHeader>
            <i className={`${styles.market.packRatesIcon} far fa-question-circle`} data-tooltip-id={pack} />
            {packs.find(p => p.id === pack).name} Pack
        </ModalHeader>
        <ModalText>Would you like to purchase this pack for {packs.find(p => p.id === pack).price} tokens?</ModalText>

        {error && <ModalError>{error}</ModalError>}

        <ModalButtons loading={loading}>
            <GenericButton>Yes</GenericButton>
            <GenericButton onClick={() => closeModal()}>No</GenericButton>
        </ModalButtons>
    </>)
}