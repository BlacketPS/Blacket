import { useModal } from "@stores/ModalStore";
import { ModalHeader, ModalText, ModalButtons } from "@components/Modals";
import { GenericButton } from "@components/Buttons";

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