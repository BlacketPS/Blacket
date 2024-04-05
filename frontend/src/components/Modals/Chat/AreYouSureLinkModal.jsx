import { useModal } from "@stores/ModalStore";
import { ModalHeader, ModalText, ModalButtons } from "@components/Modals";
import { GenericButton } from "@components/Buttons";

/**
 * Safety: The "Are you sure you want to go to this link?" modal.   
 * *Side note, unsure why the modal is named "OpenPackModal" when it is unrelated.*
 * @param {Object} props The properties for this component.
 * @param {string} props.link The link to go to.
 * @returns {JSX.Element} The are you sure link modal component.
 */
export default function OpenPackModal({ link }) {
    const { closeModal } = useModal();

    return (<>
        <ModalHeader>Warning</ModalHeader>
        <ModalText>
            This link will take you to an external website ({link})
            <br />
            Are you sure you want to go there?
        </ModalText>

        <ModalButtons>
            <GenericButton onClick={() => {
                window.open(link, "_blank");

                closeModal();
            }}>Yes</GenericButton>
            <GenericButton onClick={() => closeModal()}>No</GenericButton>
        </ModalButtons>
    </>)
}