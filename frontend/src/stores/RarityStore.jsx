/**
 * @file The rarity store provider.
 */

let rarities = null;

/**
 * Get the rarities from the API.
 * @returns {Promise} The rarities fetched from the API.
 */
export const getRarities = async () => await fetch.get("/api/data/rarities").then(res => {
    rarities = res.data;
    return res.data;
}).catch(err => err);

export { rarities };