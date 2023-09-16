export default {
    method: "get",
    handler: () => {
        return global.config.game;
    }
}