import { useState } from "react";
import { useModal } from "@stores/ModalStore";
import { useUser } from "@stores/UserStore";
import { blooks } from "@stores/BlookStore";
import { useSellBlooks } from "@controllers/blooks";
import { ModalHeader, ModalText, ModalButtons, ModalError } from "@components/Modals";
import { GenericButton } from "@components/Buttons";
import { Input } from "@components";

/**
 * The sell blooks modal.
 * @param {Object} props The properties for this component.
 * @param {string} props.blook The blook to sell.
 * @returns {JSX.Element} The sell blooks modal component.
 */
export default function SellBlooksModal({ blook }) {
    // The loading state.
    const [loading, setLoading] = useState(false);

    // The error state.
    const [error, setError] = useState(null);

    // The quantity of blooks to sell.
    const [quantity, setQuantity] = useState(1);

    // Be able to sell blooks.
    const sellBlooks = useSellBlooks();

    // Be able to close the modal.
    const { closeModal } = useModal();

    // Get the user.
    const { user } = useUser();

    return (<>
        <ModalHeader>Sell {blooks.find(b => b.id === blook).name} Blook(s) for {blooks.find(b => b.id === blook).price} tokens</ModalHeader>

        <ModalText>How many Blooks would you like to sell?</ModalText>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <form style={{ width: "75px" }}>
                <Input value={quantity} style={{ fontSize: "25px" }} onChange={e => {
                    setQuantity(e.target.value);
                    setError(null);
                }} autoComplete="off" focus />
            </form>
            <ModalText style={{ padding: "0 5px 15px", fontSize: "30px" }}>/ {user.blooks[blook] || 0}</ModalText>
        </div>

        {error && <ModalError>{error}</ModalError>}

        <ModalButtons loading={loading}>
            <GenericButton onClick={() => {
                setLoading(true);
                sellBlooks(blook, parseInt(quantity))
                    .then(() => closeModal())
                    .catch(err => err?.data?.message ? setError(err.data.message) : setError("Something went wrong."))
                    .finally(() => setLoading(false));
            }}>Sell</GenericButton>
            <GenericButton onClick={() => closeModal()}>Cancel</GenericButton>
        </ModalButtons>
    </>)
}