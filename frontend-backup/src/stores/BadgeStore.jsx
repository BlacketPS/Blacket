let badges = null;

export const getBadges = async () => await fetch.get("/api/data/badges").then(res => {
    badges = res.data;
    return res.data;
}).catch(err => err);

export { badges };