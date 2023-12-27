import axios from "axios";

let emojis = null;

export const getEmojis = async () => await axios.get("/api/data/emojis").then(res => {
    emojis = res.data;
    return res.data;
}).catch(err => err);

export { emojis };