import { useState } from "react";
import { useModal } from "@stores/ModalStore";
import { usePassword } from "@controllers/settings";
import { ModalHeader, ModalText, ModalButtons, ModalError } from "@components/Modals";
import { GenericButton } from "@components/Buttons";
import { Input } from "@components";

/**
 * The change password modal.
 * @returns {JSX.Element} The change password modal component.
 */
export default function ChangePasswordModal() {
    // The loading state.
    const [loading, setLoading] = useState(false);

    // The error state.
    const [error, setError] = useState(null);

    // The old password.
    const [oldPassword, setOldPassword] = useState("");

    // The new password.
    const [newPassword, setNewPassword] = useState("");

    // Be able to change the password.
    const setPassword = usePassword();

    // Be able to close the modal.
    const { closeModal } = useModal();

    return (<>
        <ModalHeader>Change Password</ModalHeader>
        <ModalText>Please fill out the form below to change your password.</ModalText>

        <form>
            <Input icon="fas fa-lock" placeholder="Old Password" type="password" value={oldPassword} onChange={e => {
                setOldPassword(e.target.value);
                setError(null);
            }} autoComplete="password" />

            <Input icon="fas fa-lock" placeholder="New Password" type="password" value={newPassword} onChange={e => {
                setNewPassword(e.target.value);
                setError(null);
            }} autoComplete="off" />
        </form>

        {error && <ModalError>{error}</ModalError>}

        <ModalButtons loading={loading}>
            <GenericButton onClick={() => {
                setLoading(true);
                setPassword(oldPassword, newPassword)
                    .then(() => closeModal())
                    .catch(err => err?.data?.message ? setError(err.data.message) : setError("Something went wrong."))
                    .finally(() => setLoading(false));
            }}>Change</GenericButton>
            <GenericButton onClick={() => closeModal()}>Cancel</GenericButton>
        </ModalButtons>
    </>)
}