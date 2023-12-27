import axios from "axios";

let credits = null;

export const getCredits = async () => await axios.get("/api/data/credits").then(res => {
    credits = res.data;
    return res.data;
}).catch(err => err);

export { credits };