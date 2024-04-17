import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "@stores/ModalStore";
import { useLogout } from "@controllers/auth";
import { ModalHeader, ModalText, ModalError, ModalButtons } from "@components/Modals";
import { GenericButton } from "@components/Buttons";

export default function LogoutModal() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const { closeModal } = useModal();

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