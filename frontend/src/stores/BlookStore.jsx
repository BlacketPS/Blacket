let blooks = null;

export const getBlooks = async () => await fetch.get("/api/data/blooks").then(res => {
    blooks = res.data;
    return res.data;
}).catch(err => err);

export { blooks };