const start = Date.now();
await import("dotenv").then(({ config }) => config({ path: "../../.env" }));
import express from "express";
import console from "#functions/internal/console";

console.info("Starting Blacket server instance...");

const app = express();

await (await import("./handlers/database.js")).default();
await (await import("./handlers/redis.js")).default();
await (await import("./handlers/middlewares.js")).default(app);
await (await import("./handlers/endpoints.js")).default(app);
await (await import("./handlers/frontend.js")).default(app);

app.listen(process.env.SERVER_PORT, () => {
    console.success(`A Blacket server instance has been successfully started on port ${process.env.SERVER_PORT}.`);
    console.debug(`Startup time: ${Date.now() - start}ms`);
    console.debug(`Process ID: ${process.pid}`);
});

/*const blooks = await global.database.models.Blook.findAll();

setInterval(async () => {
    const blook = await new global.database.models.UserBlook({
        user: "17046196499642999",
        blook: blooks[Math.floor(Math.random() * blooks.length)].id,
        ownedBy: "17046196499642999"
    }).save();

    if (blook) console.debug(`Successfully created blook ${blook.id}.`);
    else console.error(`Failed to create blook.`);
});*/

/*import fs from "fs";

const blooks = JSON.parse(fs.readFileSync("./blooks.json", "utf-8"));

const rarities = {
    "Uncommon": "2d1a0942-88bc-4dcc-bdfd-363d68236784",
    "Rare": "177f9d13-7adc-4fa8-a275-c8241b0c5253",
    "Epic": "bd85141b-cb7b-4cc0-be0e-10ffff73aa7d",
    "Legendary": "1c5329ad-a9f0-444f-8ce5-1a29b26bd43c",
    "Chroma": "6e279918-3413-4d91-b465-36e911d96edf",
    "Unique": "47e93e01-48c0-4cae-acd3-d13e2d06a054",
    "Mystical": "fbae74ec-084e-41e3-b978-aa56d1a03337",
    "Iridescent": "6f69add0-93fe-4ed9-9aa3-677036db6db6"
}

for (const blook of blooks) {
    await new global.database.models.Blook({
        name: blook.name,
        rarity: rarities[blook.rarity],
        price: blook.price,
        image: blook.image,
        background: blook.art
    }).save();

    console.debug(`Successfully created blook ${blook.name}.`);
}*/