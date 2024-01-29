import { useState } from "react";
import { useModal } from "@stores/ModalStore";
import { useDisable } from "@controllers/settings/otp";
import { ModalHeader, ModalText, ModalButtons, ModalError } from "@components/Modals";
import { GenericButton } from "@components/Buttons";
import { Input } from "@components";

export default function DisableOTPModal() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [otpCode, setOTPCode] = useState("");

    const setOTPDisabled = useDisable();

    const { closeModal } = useModal();

    return (<>
        <ModalHeader>Disable OTP</ModalHeader>
        <ModalText>Please fill out the form below to disable OTP.</ModalText>

        <form>
            <Input icon="fas fa-key" placeholder="OTP / 2FA Code" value={otpCode} onChange={e => {
                setOTPCode(e.target.value);
                setError(null);
            }} />
        </form>

        {error && <ModalError>{error}</ModalError>}

        <ModalButtons loading={loading}>
            <GenericButton onClick={() => {
                setLoading(true);
                setOTPDisabled(otpCode)
                    .then(() => closeModal())
                    .catch(err => err?.response?.data?.message ? setError(err.response.data.message) : setError("Something went wrong."))
                    .finally(() => setLoading(false));
            }}>Disable</GenericButton>
            <GenericButton onClick={() => closeModal()}>Cancel</GenericButton>
        </ModalButtons>
    </>)
}