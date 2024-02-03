import { useEffect, useState } from "react";
import { useModal } from "@stores/ModalStore";
import { useGenerate, useEnable } from "@controllers/settings/otp";
import { ModalHeader, ModalText, ModalButtons, ModalError } from "@components/Modals";
import { GenericButton } from "@components/Buttons";
import { Input } from "@components";

export default function EnableOTPModal() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [qrCodeImage, setQRCodeImage] = useState(null);
    const [otpCode, setOTPCode] = useState("");

    const getQRCode = useGenerate();
    const setOTPEnabled = useEnable();

    const { closeModal } = useModal();

    useEffect(() => {
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
                    .catch(err => err?.response?.data?.message ? setError(err.response.data.message) : setError("Something went wrong."))
                    .finally(() => setLoading(false));
            }}>Enable</GenericButton>
            <GenericButton onClick={() => closeModal()}>Cancel</GenericButton>
        </ModalButtons>

        <ModalText>After scanning the QR code, please enter the OTP / 2FA code you get from it below.<br />If the code doesn't work, try rescanning the QR code.</ModalText>
    </>)
}