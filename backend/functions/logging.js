import chalk from "chalk";

const console = global.console;

export default global.console = {
    log: (message) => console.log(message),
    info: (message) => console.log(chalk.blue("[INFO] ") + message),
    notice: (message) => console.log(chalk.yellow("[NOTICE] ") + message),
    warn: (message) => console.log(chalk.yellow("[WARN] ") + message),
    error: (message) => console.log(chalk.red("[ERROR] ") + message),
    success: (message) => console.log(chalk.green("[SUCCESS] ") + message),
    debug: (message) => console.log(chalk.magenta("[DEBUG] ") + message),
}