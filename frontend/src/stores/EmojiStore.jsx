/**
 * @file The blooks store.
 */

let emojis = null;

/**
 * Get the emojis from the API.
 * @returns {Promise} The emojis fetched from the API.
*/
export const getEmojis = async () => await fetch.get("/api/data/emojis").then(res => {
    emojis = res.data;
    return res.data;
}).catch(err => err);

export { emojis };