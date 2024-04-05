import { useState } from "react";
import { useModal } from "@stores/ModalStore";
import { useDisable } from "@controllers/settings/otp";
import { ModalHeader, ModalText, ModalButtons, ModalError } from "@components/Modals";
import { GenericButton } from "@components/Buttons";
import { Input } from "@components";

/**
 * The disable OTP modal.
 * @returns {JSX.Element} The disable OTP modal component.
 */
export default function DisableOTPModal() {
    // The loading state.
    const [loading, setLoading] = useState(false);

    // The error state.
    const [error, setError] = useState(null);

    // The OTP code.
    const [otpCode, setOTPCode] = useState("");

    // Be able to disable OTP.
    const setOTPDisabled = useDisable();

    // Be able to close the modal.
    const { closeModal } = useModal();

    return (<>
        <ModalHeader>Disable OTP</ModalHeader>
        <ModalText>Please fill out the form below to disable OTP.</ModalText>

        <form>
            <Input icon="fas fa-key" placeholder="OTP / 2FA Code" value={otpCode} onChange={e => {
                setOTPCode(e.target.value);
                setError(null);
            }} autoComplete="off" />
        </form>

        {error && <ModalError>{error}</ModalError>}

        <ModalButtons loading={loading}>
            <GenericButton onClick={() => {
                setLoading(true);
                setOTPDisabled(otpCode)
                    .then(() => closeModal())
                    .catch(err => err?.data?.message ? setError(err.data.message) : setError("Something went wrong."))
                    .finally(() => setLoading(false));
            }}>Disable</GenericButton>
            <GenericButton onClick={() => closeModal()}>Cancel</GenericButton>
        </ModalButtons>
    </>)
}