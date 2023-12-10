import axios from "axios";

const config = await axios.get("/api/config").then((res) => {
    console.log(`%c██████  ██       █████   ██████ ██   ██ ███████ ████████
██   ██ ██      ██   ██ ██      ██  ██  ██         ██    
██████  ██      ███████ ██      █████   █████      ██    
██   ██ ██      ██   ██ ██      ██  ██  ██         ██    
██████  ███████ ██   ██  ██████ ██   ██ ███████    ██    `, "line-height: 1.145");

    console.log("%cWelcome to the console! Feel free to look around, but please don't paste anything here unless you know what you're doing.", "font-size: 1.5em; font-weight: bold;");
    console.log(`%cThis server is running Blacket ${res.data.version} which is open source and available at https://github.com/XOTlC/Blacket`, "font-size: 1em; font-weight: bold;");

    return res.data;
}).catch((err) => {
    if (err?.response?.status === 403) return err.response.data.error
    else return 1;
});

export { config }