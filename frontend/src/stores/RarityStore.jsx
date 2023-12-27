import axios from "axios";

let rarities = null;

export const getRarities = async () => await axios.get("/api/data/rarities").then(res => {
    rarities = res.data;
    return res.data;
}).catch(err => err);

export { rarities };