const path = require('path');
const rimraf = require('rimraf');
const ora = require('ora');
const chalk = require('chalk');



const glob = path.join(__dirname,
    `../../apps/${process.env.npm_package_name}/dist/**/*`);
const spinner = ora(chalk.white.bold(`CLEAN: Emptying folder ${glob}`)).start();

rimraf(glob, (error) => {
    spinner.stop();

    if (error) {
        console.log(chalk.red.bold('CLEAN: FAILED'));

        throw error;
    } else {
        console.log(chalk.green.bold('CLEAN: SUCCESS'));
    }
});
