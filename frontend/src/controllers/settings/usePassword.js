import axios from "axios";

const usePassword = () => {
    const setPassword = (oldPassword, newPassword) => new Promise((resolve, reject) => axios.patch("/api/settings/password", { oldPassword, newPassword }).then(async res => {
        localStorage.setItem("token", res.data.token);

        resolve();
    }).catch(reject));

    return setPassword;
}

export default usePassword;