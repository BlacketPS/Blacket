import chalk from "chalk";

global.console = {
    log: (message: string) => process.stdout.write(message + '\n'),
    info: (message: string) => process.stdout.write(chalk.blue("[INFO] ") + message + '\n'),
    notice: (message: string) => process.stdout.write(chalk.yellow("[NOTICE] ") + message + '\n'),
    warn: (message: string) => process.stdout.write(chalk.yellow("[WARN] ") + message + '\n'),
    error: (message: string) => process.stdout.write(chalk.red("[ERROR] ") + message + '\n'),
    success: (message: string) => process.stdout.write(chalk.green("[SUCCESS] ") + message + '\n'),
    debug: (message: string) => process.stdout.write(chalk.magenta("[DEBUG] ") + message + '\n'),
} as any;