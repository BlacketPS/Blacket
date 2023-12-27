import axios from "axios";

let items = null;

export const getItems = async () => await axios.get("/api/data/items").then(res => {
    items = res.data;
    return res.data;
}).catch(err => err);

export { items };