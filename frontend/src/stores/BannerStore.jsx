import axios from "axios";

let banners = null;

export const getBanners = async () => await axios.get("/api/data/banners").then(res => {
    banners = res.data;
    return res.data;
}).catch(err => err);

export { banners };