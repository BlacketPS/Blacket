import { useUser } from "@stores/UserStore";

/**
 * The hook that handles enabling OTP.
 * @returns {Function} The function to enable OTP.
 */
const useEnable = () => {
    const { user, setUser } = useUser();

    // Requests the server to enable OTP with the given code.
    const setOTPEnabled = (code) => new Promise((resolve, reject) => fetch.patch("/api/settings/otp/enable", { code }).then(async res => {
        await setUser({ ...user, settings: { ...user.settings, otpEnabled: true } });

        resolve();
    }).catch(reject));

    return setOTPEnabled;
}

export default useEnable;