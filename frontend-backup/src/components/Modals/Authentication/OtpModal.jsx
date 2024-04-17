import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "@stores/ModalStore";
import { useLogin } from "@controllers/auth";
import { ModalHeader, ModalText, ModalError, ModalButtons } from "@components/Modals";
import { GenericButton } from "@components/Buttons";
import { Input } from "@components";

export default function OtpModal({ username, password }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [otpCode, setOTPCode] = useState("");

    const navigate = useNavigate();

    const { closeModal } = useModal();

    const login = useLogin();

    return (<>
        <ModalHeader>OTP Required</ModalHeader>
        <ModalText>Please fill out your OTP code below to login.</ModalText>

        <form>
            <Input icon="fas fa-key" placeholder="OTP / 2FA Code" value={otpCode} onChange={e => {
                setOTPCode(e.target.value);
                setError(null);
            }} autoComplete="off" focus />
        </form>

        {error && <ModalError>{error}</ModalError>}

        <ModalButtons loading={loading}>
            <GenericButton onClick={() => {
                if (otpCode === "") return setError("Please enter your OTP code.");

                setLoading(true);
                login(username, password, otpCode)
                    .then(() => closeModal() && navigate("/dashboard"))
                    .catch(err => err?.data?.message ? setError(err.data.message) : setError("Something went wrong."))
                    .finally(() => setLoading(false));
            }}>Login</GenericButton>
            <GenericButton onClick={() => closeModal()}>Cancel</GenericButton>
        </ModalButtons>
    </>)
}