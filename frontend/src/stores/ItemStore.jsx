/**
 * @file The items store provider.
 */

let items = null;

/**
 * Get the items from the API.
 * @returns {Promise} The items fetched from the API.
 */
export const getItems = async () => await fetch.get("/api/data/items").then(res => {
    items = res.data;
    return res.data;
}).catch(err => err);

export { items };