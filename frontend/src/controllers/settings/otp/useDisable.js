import axios from "axios";
import { useUser } from "@stores/UserStore";

const useDisable = () => {
    const { user, setUser } = useUser();

    const setOTPDisabled = (code) => new Promise((resolve, reject) => axios.patch("/api/settings/otp/disable", { code }).then(async res => {
        await setUser({ ...user, settings: { ...user.settings, otpEnabled: false } });

        resolve();
    }).catch(reject));

    return setOTPDisabled;
}

export default useDisable;