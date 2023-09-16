export default {
    method: "get",
    handler: (_, res) => res.status(200).json(global.config.game)
}