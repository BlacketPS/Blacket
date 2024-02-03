import { useNavigate } from "react-router-dom";
import { useModal } from "@stores/ModalStore";
import { useLogout } from "@controllers/auth";
import { ModalHeader, ModalText, ModalButtons } from "@components/Modals";
import { GenericButton } from "@components/Buttons";

export default function LogoutModal() {
    const navigate = useNavigate();

    const { closeModal } = useModal();

    const logout = useLogout();

    return (<>
        <ModalHeader>Question</ModalHeader>
        <ModalText>Are you sure you want to logout?</ModalText>

        <ModalButtons>
            <GenericButton onClick={() => {
                logout();
                navigate("/login");
                closeModal();
            }}>Yes</GenericButton>
            <GenericButton onClick={() => closeModal()}>No</GenericButton>
        </ModalButtons>
    </>)
}