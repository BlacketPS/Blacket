import { useState } from "react";
import { useModal } from "@stores/ModalStore";
import { useUsername } from "@controllers/settings";
import { ModalHeader, ModalText, ModalButtons, ModalError } from "@components/Modals";
import { GenericButton } from "@components/Buttons";
import { Input } from "@components";

/**
 * The change username modal.
 * @returns {JSX.Element} The change username modal component.
 */
export default function ChangeUsernameModal() {
    // The loading state.
    const [loading, setLoading] = useState(false);

    // The error state.
    const [error, setError] = useState(null);

    // The new username.
    const [newUsername, setNewUsername] = useState("");

    // The password which the user must confirm to change the username.
    const [password, setPassword] = useState("");

    // Be able to change the username.
    const setUsername = useUsername();

    // Be able to close the modal.
    const { closeModal } = useModal();

    return (<>
        <ModalHeader>Change Username</ModalHeader>
        <ModalText>Please fill out the form below to change your username.</ModalText>

        <form>
            <Input icon="fas fa-user" placeholder="New Username" value={newUsername} onChange={e => {
                setNewUsername(e.target.value);
                setError(null);
            }} autoComplete="off" />

            <Input icon="fas fa-lock" placeholder="Password" type="password" value={password} onChange={e => {
                setPassword(e.target.value);
                setError(null);
            }} autoComplete="password" />
        </form>

        {error && <ModalError>{error}</ModalError>}

        <ModalButtons loading={loading}>
            <GenericButton onClick={() => {
                setLoading(true);
                setUsername(newUsername, password)
                    .then(() => closeModal())
                    .catch(err => err?.data?.message ? setError(err.data.message) : setError("Something went wrong."))
                    .finally(() => setLoading(false));
            }}>Change</GenericButton>
            <GenericButton onClick={() => closeModal()}>Cancel</GenericButton>
        </ModalButtons>

        <ModalText>This will allow anyone to take your old username!<br />Take caution while performing this action!</ModalText>
    </>)
}