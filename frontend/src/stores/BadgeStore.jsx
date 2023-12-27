import axios from "axios";

let badges = null;

export const getBadges = async () => await axios.get("/api/data/badges").then(res => {
    badges = res.data;
    return res.data;
}).catch(err => err);

export { badges };