let packs = null;

export const getPacks = async () => await fetch.get("/api/data/packs").then(res => {
    packs = res.data;
    return res.data;
}).catch(err => err);

export { packs };