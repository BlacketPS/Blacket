import { useState } from "react";
import { useModal } from "@stores/ModalStore";
import { useUsername } from "@controllers/settings";
import { ModalHeader, ModalText, ModalButtons, ModalError } from "@components/Modals";
import { GenericButton } from "@components/Buttons";
import { Input } from "@components";

export default function ChangeUsernameModal() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newUsername, setNewUsername] = useState("");
    const [password, setPassword] = useState("");

    const setUsername = useUsername();

    const { closeModal } = useModal();

    return (<>
        <ModalHeader>Change Username</ModalHeader>
        <ModalText>Please fill out the form below to change your username.</ModalText>

        <form>
            <Input icon="fas fa-user" placeholder="New Username" value={newUsername} onChange={e => {
                setNewUsername(e.target.value);
                setError(null);
            }} />

            <Input icon="fas fa-lock" placeholder="Password" type="password" value={password} onChange={e => {
                setPassword(e.target.value);
                setError(null);
            }} />
        </form>

        {error && <ModalError>{error}</ModalError>}

        <ModalButtons loading={loading}>
            <GenericButton onClick={() => {
                setLoading(true);
                setUsername(newUsername, password)
                    .then(() => closeModal())
                    .catch(err => err?.response?.data?.message ? setError(err.response.data.message) : setError("Something went wrong."))
                    .finally(() => setLoading(false));
            }}>Change</GenericButton>
            <GenericButton onClick={() => closeModal()}>Cancel</GenericButton>
        </ModalButtons>

        <ModalText>This will allow anyone to take your old username!<br />Take caution while performing this action!</ModalText>
    </>)
}