let banners = null;

export const getBanners = async () => await fetch.get("/api/data/banners").then(res => {
    banners = res.data;
    return res.data;
}).catch(err => err);

export { banners };