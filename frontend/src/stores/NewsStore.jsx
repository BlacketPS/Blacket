import axios from "axios";

let news = null;

export const getNews = async () => await axios.get("/api/data/news").then(res => {
    news = res.data;
    return res.data;
}).catch(err => err);

export { news };