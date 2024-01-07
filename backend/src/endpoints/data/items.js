export default {
    method: "get",
    endpoint: async (_, res) => res.status(200).json(JSON.parse(await global.redis.get("blacket-items")))
}