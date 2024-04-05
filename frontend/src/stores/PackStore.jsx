/**
 * @file The pack store provider wrapper.
 */

let packs = null;

/**
 * Get the packs from the API.
 * @returns {Promise} The packs fetched from the API.
 */
export const getPacks = async () => await fetch.get("/api/data/packs").then(res => {
    packs = res.data;
    return res.data;
}).catch(err => err);

export { packs };