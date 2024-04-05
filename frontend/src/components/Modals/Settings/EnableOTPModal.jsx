import { useEffect, useState } from "react";
import { useModal } from "@stores/ModalStore";
import { useGenerate, useEnable } from "@controllers/settings/otp";
import { ModalHeader, ModalText, ModalButtons, ModalError } from "@components/Modals";
import { GenericButton } from "@components/Buttons";
import { Input } from "@components";

/**
 * The enable OTP modal. Generates a QR code and enables OTP.
 * @returns {JSX.Element} The enable OTP modal component.
 */
export default function EnableOTPModal() {
    // The loading state.
    const [loading, setLoading] = useState(false);

    // The error state.
    const [error, setError] = useState(null);

    // The QR code image and OTP code.
    const [qrCodeImage, setQRCodeImage] = useState(null);
    const [otpCode, setOTPCode] = useState("");

    // Be able to generate a QR code and enable OTP.
    const getQRCode = useGenerate();
    const setOTPEnabled = useEnable();

    // Be able to close the modal.
    const { closeModal } = useModal();

    useEffect(() => {
        // Generate the QR code and set the image.
        getQRCode().then(res => setQRCodeImage(res.data.image)).catch(() => setError("Unable to generate QR code."));
    }, []);

    return (<>
        <ModalHeader>Enable OTP</ModalHeader>
        <ModalText>Please scan the QR code below with your authenticator app.</ModalText>

        {qrCodeImage ? <img src={qrCodeImage} style={{ marginBottom: "10px", borderRadius: "10px" }} /> : <ModalText>Loading QR code...</ModalText>}

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
                setOTPEnabled(otpCode)
                    .then(() => closeModal())
                    .catch(err => err?.data?.message ? setError(err.data.message) : setError("Something went wrong."))
                    .finally(() => setLoading(false));
            }}>Enable</GenericButton>
            <GenericButton onClick={() => closeModal()}>Cancel</GenericButton>
        </ModalButtons>

        <ModalText>After scanning the QR code, please enter the OTP / 2FA code you get from it below.<br />If the code doesn't work, try rescanning the QR code.</ModalText>
    </>)
}