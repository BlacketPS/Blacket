let titles = null;

export const getTitles = async () => await fetch.get("/api/data/titles").then(res => {
    titles = res.data;
    return res.data;
}).catch(err => err);

export { titles };