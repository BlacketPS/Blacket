import { useModal } from "@stores/ModalStore";
import { ModalHeader, ModalBody, ModalButtons } from "@components/Modals";
import { GenericButton } from "@components/Buttons";

export default function ErrorModal() {
    const { closeModal } = useModal();

    return (<>
        <ModalHeader>Error</ModalHeader>
        <ModalBody>Something went wrong.</ModalBody>

        <ModalButtons>
            <GenericButton onClick={() => closeModal()}>Okay</GenericButton>
        </ModalButtons>
    </>)
}