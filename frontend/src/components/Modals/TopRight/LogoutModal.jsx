import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "@stores/ModalStore";
import { useLogout } from "@controllers/auth";
import { ModalHeader, ModalText, ModalError, ModalButtons } from "@components/Modals";
import { GenericButton } from "@components/Buttons";

/**
 * A logout modal.
 * @returns {JSX.Element} The logout modal component.
 */
export default function LogoutModal() {
    // The loading state.
    const [loading, setLoading] = useState(false);

    // The error state.
    const [error, setError] = useState(null);

    // Be able to navigate.
    const navigate = useNavigate();

    // Be able to close the modal.
    const { closeModal } = useModal();

    // Be able to logout.
    const logout = useLogout();

    return (<>
        <ModalHeader>Question</ModalHeader>
        <ModalText>Are you sure you want to logout?</ModalText>

        {error && <ModalError>{error}</ModalError>}

        <ModalButtons loading={loading}>
            <GenericButton onClick={() => {
                setLoading(true);
                logout()
                    .then(() => navigate("/login") || closeModal())
                    .catch(err => err?.data?.message ? setError(err.data.message) : setError("Something went wrong."))
                    .finally(() => setLoading(false));
            }}>Yes</GenericButton>
            <GenericButton onClick={() => closeModal()}>No</GenericButton>
        </ModalButtons>
    </>)
}