import { UserStoreContext } from "@stores/UserStore";

export const login = (username, password) => new Promise((resolve, reject) => axios.post("/api/auth/login", {
    username,
    password
}).then(async res => {
    if (res.status !== 200) return reject(res.data.message);
    localStorage.setItem("token", res.data.token);
    await UserStoreContext.actions.fetchUser();
    resolve();
}).catch(reject));

export const register = (username, password, checked) => new Promise((resolve, reject) => axios.post("/api/auth/register", {
    username,
    password,
    acceptedTerms: checked
}).then(async res => {
    if (res.status !== 200) return reject(res.data.message);
    localStorage.setItem("token", res.data.token);
    await UserStoreContext.actions.fetchUser();
    resolve();
}).catch(reject));