/**
 * @file The blooks store.
 */

let blooks = null;

/**
 * Get the blooks from the API.
 * @returns {Promise} The blooks fetched from the API.
 */
export const getBlooks = async () => await fetch.get("/api/data/blooks").then(res => {
    blooks = res.data;
    return res.data;
}).catch(err => err);

export { blooks };