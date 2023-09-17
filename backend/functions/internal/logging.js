import chalk from "chalk";

export default () => {
    const old = {
        log: console.log,
        warn: console.warn,
        error: console.error,
        info: console.info,
        debug: console.debug,
    }

    console.info = function () {
        let args = Array.from(arguments).map(text => text.replace(/<b>(.*?)<\/b>/g, (_, innerText) => chalk.bold(innerText)));
        args.unshift(chalk.blue("[INFO] "));
        old.log.apply(console, args);
    }

    console.success = function () {
        let args = Array.from(arguments).map(text => text.replace(/<b>(.*?)<\/b>/g, (_, innerText) => chalk.bold(innerText)));
        args.unshift(chalk.green("[SUCCESS] "));
        old.log.apply(console, args);
    }

    console.warn = function () {
        let args = Array.from(arguments).map(text => text.replace(/<b>(.*?)<\/b>/g, (_, innerText) => chalk.bold(innerText)));
        args.unshift(chalk.yellow("[WARNING] "));
        old.warn.apply(console, args);
    }

    console.error = function () {
        let args = Array.from(arguments).map(text => text.replace(/<b>(.*?)<\/b>/g, (_, innerText) => chalk.bold(innerText)));
        args.unshift(chalk.red("[ERROR] "));
        old.error.apply(console, args);
    }

    console.debug = function () {
        let args = Array.from(arguments).map(text => text.replace(/<b>(.*?)<\/b>/g, (_, innerText) => chalk.bold(innerText)));
        args.unshift(chalk.magenta("[DEBUG] "));
        old.debug.apply(console, args);
    }
}