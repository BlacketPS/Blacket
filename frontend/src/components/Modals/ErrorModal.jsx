import { useModal } from "@stores/ModalStore";
import { ModalHeader, ModalText, ModalButtons } from "@components/Modals";
import { GenericButton } from "@components/Buttons";

export default function ErrorModal({ onClick, children }) {
    const { closeModal } = useModal();

    return (<>
        <ModalHeader>Error</ModalHeader>
        <ModalText>{children ? children : "Something went wrong."}</ModalText>

        <ModalButtons>
            <GenericButton onClick={() => {
                if (onClick) onClick();
                closeModal();
            }}>Okay</GenericButton>
        </ModalButtons>
    </>)
}