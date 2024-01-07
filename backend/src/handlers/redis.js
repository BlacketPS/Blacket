import { createClient } from "redis";
import console from "#functions/internal/console";

const env = {
    host: process.env.SERVER_REDIS_HOST,
    port: process.env.SERVER_REDIS_PORT,
    password: process.env.SERVER_REDIS_PASSWORD
}

export default async () => {
    console.info("Authenticating to Redis server...");

    global.redis = createClient({ host: env.host, port: env.port, password: env.password });

    await global.redis.connect().then(() => console.success("Authenticated to Redis server.")).catch(error => {
        console.error(`Failed to authenticate to Redis server. ${error}`);
        process.exit(1);
    });

    console.info("Caching data from database to Redis server...");

    await global.redis.set("blacket-badges", await global.database.models.Badge.findAll().then(badges => JSON.stringify(badges)));
    await global.redis.set("blacket-banners", await global.database.models.Banner.findAll().then(banners => JSON.stringify(banners)));
    await global.redis.set("blacket-blooks", await global.database.models.Blook.findAll().then(blooks => JSON.stringify(blooks)));
    await global.redis.set("blacket-emojis", await global.database.models.Emoji.findAll().then(emojis => JSON.stringify(emojis)));
    await global.redis.set("blacket-items", await global.database.models.Item.findAll().then(items => JSON.stringify(items)));

    await global.redis.set("blacket-packs", await global.database.models.Pack.findAll({
        include: [{ model: global.database.models.PackBlook, as: "blooks", attributes: ["blook"] }]
    }).then(packs => JSON.stringify(packs.map(pack => {
        pack = pack.get({ plain: true });
        pack.blooks = pack.blooks.map(blook => blook.blook);
        return pack;
    }))));

    await global.redis.set("blacket-rarities", await global.database.models.Rarity.findAll().then(rarities => JSON.stringify(rarities)));
    await global.redis.set("blacket-titles", await global.database.models.Title.findAll().then(titles => JSON.stringify(titles)));

    console.success("Cached data from database to Redis server.");
}