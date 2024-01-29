import axios from "axios";
import { useUser } from "@stores/UserStore";

const useEnable = () => {
    const { user, setUser } = useUser();

    const setOTPEnabled = (code) => new Promise((resolve, reject) => axios.patch("/api/settings/otp/enable", { code }).then(async res => {
        await setUser({ ...user, settings: { ...user.settings, otpEnabled: true } });

        resolve();
    }).catch(reject));

    return setOTPEnabled;
}

export default useEnable;