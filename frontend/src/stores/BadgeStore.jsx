/**
 * @file The blooks store provider.
 */


let badges = null;

/**
 * Get the badges from the API.
 * @returns {Promise} The badges fetched from the API.
 */
export const getBadges = async () => await fetch.get("/api/data/badges").then(res => {
    badges = res.data;
    return res.data;
}).catch(err => err);

export { badges };