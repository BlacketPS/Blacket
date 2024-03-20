import { useState } from "react";
import { Tooltip } from "react-tooltip";
import { useModal } from "@stores/ModalStore";
import { useUser } from "@stores/UserStore";
import { blooks } from "@stores/BlookStore";
import { ModalHeader, ModalText, ModalButtons, ModalError } from "@components/Modals";
import { GenericButton } from "@components/Buttons";
import styles from "@styles";

export default function OpenPackModal({ pack, onYesButton }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { closeModal } = useModal();
    const { user } = useUser();

    if (user.tokens < pack.price) return (<>
        <ModalHeader>Error</ModalHeader>

        <ModalText>You do not have enough tokens to purchase this pack.</ModalText>

        <ModalButtons>
            <GenericButton onClick={() => closeModal()}>Okay</GenericButton>
        </ModalButtons>
    </>)
    else return (<>
        <Tooltip id={pack.id} place="left" effect="solid">
            {pack.blooks.map(blook => <div key={blook}>
                {blooks.find(b => b.id === blook).name}: {blooks.find(b => b.id === blook).chance}%
            </div>)}
        </Tooltip>

        <ModalHeader>
            <i className={`${styles.market.packRatesIcon} far fa-question-circle`} data-tooltip-id={pack.id} />
            {pack.name} Pack
        </ModalHeader>
        <ModalText>Would you like to purchase this pack for <img className={styles.market.tokenPrice} src="/content/token.png"/> {pack.price} tokens?</ModalText>

        {error && <ModalError>{error}</ModalError>}

        <ModalButtons loading={loading}>
            <GenericButton onClick={() => {
                if (!onYesButton) return setError("Something went wrong.");

                setLoading(true);
                onYesButton()
                    .then(() => closeModal())
                    .catch(err => err?.data?.message ? setError(err.data.message) : setError("Something went wrong."))
                    .finally(() => setLoading(false));
            }}>Yes</GenericButton>
            <GenericButton onClick={() => closeModal()}>No</GenericButton>
        </ModalButtons>
    </>)
}