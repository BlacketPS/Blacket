import fs from "fs";

if (fs.existsSync("./config.json")) {
    const config = JSON.parse(fs.readFileSync("./config.json").toString());

    console.notice("Detected configuration file in root directory. Setting up Blacket using configuration file.");

    let env = "";

    env += `SERVER_PORT=${config.port}\n\n`;
    env += `DATABASE_DIALECT=${config.database_type}\n`;
    env += config.database_host !== "" ? `DATABASE_HOST=${config.database_host}\n` : `DATABASE_HOST=localhost\n`;
    env += config.database_port !== "" ? `DATABASE_PORT=${config.database_port}\n` : `DATABASE_PORT=null\n`;
    env += `DATABASE_USERNAME=${config.database_username}\n`;
    env += config.database_password_enabled && `DATABASE_PASSWORD="${config.database_password}"\n`;
    env += config.database_name !== "" ? `DATABASE_NAME=${config.database_name}\n` : "blacket\n";
    env += "\n";
    if (config.paypal_enabled) {
        env += `PAYPAL_MODE=${config.paypal_mode}\n`
        env += `PAYPAL_CLIENT_ID=${config.paypal_client_id}\n`;
        env += `PAYPAL_CLIENT_SECRET=${config.paypal_client_secret}\n\n`;
    }
    env += `FRONTEND_TYPE=development`;

    fs.writeFileSync("./.env", env);

    if (!process.env.DATABASE_DIALECT) console.success("Created environment file from configuration. Please run the server again to finish setup.") & process.exit(0);

    for (const [key, value] of Object.entries(config)) {
        if (key.startsWith("database") || key.startsWith("paypal")) continue;

        await global.database.query("INSERT INTO configuration (`key`, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = ?", {
            replacements: [key, value, value]
        });
    }

    console.success("Server has been successfully configured using configuration file. Please restart the server to apply changes.");
    fs.unlinkSync("./config.json");
    process.exit(0);
}

if (!process.env.DATABASE_DIALECT) console.error("Your Blacket server has not been configured yet. Please visit https://setup.blacket.org to generate a config file for your server.") & process.exit(1);

export default async () => await global.database.query("SELECT * FROM configuration").then((config) => global.config = Object.fromEntries(config[0].map(({ key, value }) => [key, value]))).catch((error) => console.error(`Failed to load configuration: ${error}`) & process.exit(1));