const webpack = require('webpack');
const ora = require('ora');
const chalk = require('chalk');
const argv = require('minimist')(process.argv.slice(2));
const webpackDevConf = require('../webpack/dev.conf.js');
const webpackProdConf = require('../webpack/prod.conf.js');



const webpackConf = argv.dev ? webpackDevConf : webpackProdConf;
const spinner = ora(chalk.white.bold('BUILD: Building application')).start();

webpack(webpackConf, (error, stats) => {
    spinner.stop();

    // https://github.com/shama/webpack-stream/issues/64
    console.log(`${stats.toString({
        colors: true,
        chunks: false
    })}\n`);

    if (error) {
        console.log(chalk.red.bold('BUILD: FAILED'));

        throw error;
    }

    console.log(chalk.green.bold('BUILD: SUCCESS'));
});
