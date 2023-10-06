export default {
    method: "GET",
    handler: (_, res) => res.status(200).json(global.config.game)
}