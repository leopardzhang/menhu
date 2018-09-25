const webpack = require('webpack');
const ora = require('ora');
const chalk = require('chalk');
const webpackDllConf = require('../webpack/dll.conf.js');



const spinner = ora(chalk.white.bold('DLL: Building application\'s libs')).start();

webpack(webpackDllConf, (error, stats) => {
    spinner.stop();

    // https://github.com/shama/webpack-stream/issues/64
    console.log(`${stats.toString({
        colors: true,
        chunks: false
    })}\n`);

    if (error) {
        console.log(chalk.red.bold('DLL: FAILED'));

        throw error;
    }

    console.log(chalk.green.bold('DLL: SUCCESS'));
});
