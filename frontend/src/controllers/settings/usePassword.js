/**
 * The hook that handles setting the new password.
 * @returns {Function} The function to set the new password.
 */
const usePassword = () => {
    // Using an old password and a new password, set the new password. You will stay logged in as the API will return a new token.
    const setPassword = (oldPassword, newPassword) => new Promise((resolve, reject) => fetch.patch("/api/settings/password", { oldPassword, newPassword }).then(async res => {
        localStorage.setItem("token", res.data.token);

        resolve();
    }).catch(reject));

    return setPassword;
}

export default usePassword;