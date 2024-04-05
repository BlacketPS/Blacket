import { useModal } from "@stores/ModalStore";
import { ModalHeader, ModalText, ModalButtons } from "@components/Modals";
import { GenericButton } from "@components/Buttons";

/**
 * A generic error modal.
 * @param {Object} props The properties for this component.
 * @param {Function} props.onClick The function to call when the okay button is clicked.
 * @param {Object} props.children The children of the component.
 * @returns {JSX.Element} The error modal component.
 */
export default function ErrorModal({ onClick, children }) {
    // Be able to close the modal.
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