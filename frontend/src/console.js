/**
 * @file Prints the self-XSS warning and the Blacket welcome message to the console, as well as the development mode reminder.
 */

console.info("%cBlacket", "font-family: 'Titan One', sans-serif; font-size: 8em;");

console.info("%cWelcome to the console! Feel free to look around, but please don't paste anything here unless you know what you're doing.", "font-family: 'Nunito'; font-size: 2em; font-weight: bold;");
console.info("%cThis server is running Blacket which is open source and available at https://github.com/XOTlC/Blacket", "font-family: 'Nunito'; font-size: 1.5em; font-weight: bold;");

console.info(`[Blacket] Running Blacket v${import.meta.env.VITE_INFORMATION_VERSION}`);

if (import.meta.env.MODE === "development") {
    console.info("[Blacket] You are running in development mode, this is not recommended for production use.");
    console.info("[Blacket] You can disable this message by changing the mode in the .env file to production.");
}