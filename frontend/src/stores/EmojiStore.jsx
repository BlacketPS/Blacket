let emojis = null;

export const getEmojis = async () => await fetch.get("/api/data/emojis").then(res => {
    emojis = res.data;
    return res.data;
}).catch(err => err);

export { emojis };