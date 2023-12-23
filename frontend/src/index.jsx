console.info(`%c██████  ██       █████   ██████ ██   ██ ███████ ████████
██   ██ ██      ██   ██ ██      ██  ██  ██         ██    
██████  ██      ███████ ██      █████   █████      ██    
██   ██ ██      ██   ██ ██      ██  ██  ██         ██    
██████  ███████ ██   ██  ██████ ██   ██ ███████    ██    `, "line-height: 1.145");

console.info("%cWelcome to the console! Feel free to look around, but please don't paste anything here unless you know what you're doing.", "font-size: 1.5em; font-weight: bold;");
console.info("%cThis server is running Blacket which is open source and available at https://github.com/XOTlC/Blacket", "font-size: 1em; font-weight: bold;");

console.info(`[Blacket] Running Blacket v${import.meta.env.VITE_INFORMATION_VERSION}`);

import { createRoot } from "react-dom/client";
import App from "./App";

import axios from "axios";

window.axios = axios;

createRoot(document.getElementById("app")).render(<App />);