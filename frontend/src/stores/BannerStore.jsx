/**
 * @file The banners store.
 */

let banners = null;

/**
 * Get the banners from the API.
 * @returns {Promise} The banners fetched from the API.
 */
export const getBanners = async () => await fetch.get("/api/data/banners").then(res => {
    banners = res.data;
    return res.data;
}).catch(err => err);

export { banners };