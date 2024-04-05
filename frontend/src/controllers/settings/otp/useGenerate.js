/**
 * The hook allowing for the generation of a QR code for OTP.
 * @returns {Function} The function to generate the QR code.
 */
const useGenerate = () => {
    const getQRCode = () => new Promise((resolve, reject) => fetch.patch("/api/settings/otp/generate").then(res => resolve(res)).catch(reject));

    return getQRCode;
}

export default useGenerate;