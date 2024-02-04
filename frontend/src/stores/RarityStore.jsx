let rarities = null;

export const getRarities = async () => await fetch.get("/api/data/rarities").then(res => {
    rarities = res.data;
    return res.data;
}).catch(err => err);

export { rarities };