import axios from "axios";

let titles = null;

export const getTitles = async () => await axios.get("/api/data/titles").then(res => {
    titles = res.data;
    return res.data;
}).catch(err => err);

export { titles };