console.info("%cBlacket", "font-family: Titan One; font-size: 8em;");

console.info("%cWelcome to the console! Feel free to look around, but please don't paste anything here unless you know what you're doing.", "font-family: Nunito; font-size: 2em; font-weight: bold;");
console.info("%cThis server is running Blacket which is open source and available at https://github.com/XOTlC/Blacket", "font-family: Nunito; font-size: 1.5em; font-weight: bold;");

const originalConsole = window.console;

window.console = {
    log: (message) => originalConsole.log(message),
    info: (message) => originalConsole.info(`%c[INFO] %c${message}`, "color: #2081CE;", ""),
    notice: (message) => originalConsole.info(`%c[NOTICE] %c${message}`, "color: #E5E510;", ""),
    warn: (message) => originalConsole.warn(`%c[WARNING] %c${message}`, "color: #E5E510;", ""),
    error: (message) => originalConsole.error(`%c[ERROR] %c${message}`, "color: #FF5A57;", ""),
    success: (message) => originalConsole.info(`%c[SUCCESS] %c${message}`, "color: #06BC79;", ""),
    debug: (message) => originalConsole.debug(`%c[VERBOSE] %c${message}`, "color: #923FBC;", "")
}

console.info(`Running Blacket v${import.meta.env.VITE_INFORMATION_VERSION}`);