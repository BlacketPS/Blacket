import { useModal } from "@stores/ModalStore";
import { ModalHeader, ModalBody, ModalButtons } from "@components/Modals";
import { GenericButton } from "@components/Buttons";
import { Input } from "@components";

export default function ChangeUsernameModal() {
    const { closeModal } = useModal();

    return (<>
        <ModalHeader>Change Username</ModalHeader>
        <ModalBody>Please fill out the form below to change your username.</ModalBody>

        <form>
            <Input icon="fas fa-user" placeholder="New Username" />
            <Input icon="fas fa-lock" placeholder="Password" type="password" />
        </form>

        <ModalButtons>
            <GenericButton>Change</GenericButton>
            <GenericButton onClick={() => closeModal()}>Cancel</GenericButton>
        </ModalButtons>

        <ModalBody>This will allow anyone to take your old username!<br />Take caution while performing this action!</ModalBody>
    </>)
}