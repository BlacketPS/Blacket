/**
 * @file The titles store provider.
 */

let titles = null;

/**
 * Get the titles from the API.
 * @returns {Promise} The titles fetched from the API.
 */
export const getTitles = async () => await fetch.get("/api/data/titles").then(res => {
    titles = res.data;
    return res.data;
}).catch(err => err);

export { titles };