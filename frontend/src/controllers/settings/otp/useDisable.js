import { useUser } from "@stores/UserStore";

/**
 * The hook that handles disabling OTP.
 * @returns {Function} The function to disable OTP.
 */
const useDisable = () => {
    const { user, setUser } = useUser();

    // Requests the server to disable OTP with the given code.
    const setOTPDisabled = (code) => new Promise((resolve, reject) => fetch.patch("/api/settings/otp/disable", { code }).then(async res => {
        await setUser({ ...user, settings: { ...user.settings, otpEnabled: false } });

        resolve();
    }).catch(reject));

    return setOTPDisabled;
}

export default useDisable;