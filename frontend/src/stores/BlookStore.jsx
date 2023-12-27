import axios from "axios";

let blooks = null;

export const getBlooks = async () => await axios.get("/api/data/blooks").then(res => {
    blooks = res.data;
    return res.data;
}).catch(err => err);

export { blooks };