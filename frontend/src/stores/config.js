import axios from "axios";

console.info(`%c██████  ██       █████   ██████ ██   ██ ███████ ████████
██   ██ ██      ██   ██ ██      ██  ██  ██         ██    
██████  ██      ███████ ██      █████   █████      ██    
██   ██ ██      ██   ██ ██      ██  ██  ██         ██    
██████  ███████ ██   ██  ██████ ██   ██ ███████    ██    `, "line-height: 1.145");

console.info("%cWelcome to the console! Feel free to look around, but please don't paste anything here unless you know what you're doing.", "font-size: 1.5em; font-weight: bold;");
console.info("%cThis server is running Blacket which is open source and available at https://github.com/XOTlC/Blacket", "font-size: 1em; font-weight: bold;");

console.debug("[Blacket] Requesting configuration from server...");

const config = await axios.get("/api/config").then((res) => {
    console.debug("[Blacket] Loaded configuration from server...");
    console.log(`[Blacket] Running Blacket ${res.data.version}.`);
    return res.data;
}).catch((err) => {
    console.error("[Blacket] Failed to load configuration from server.");
    if (err?.response?.status === 403) return err.response.data.error
    else return 1;
});

export { config }