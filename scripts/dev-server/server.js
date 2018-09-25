const express = require('express');
const webpack = require('webpack');
const chalk = require('chalk');
const opn = require('opn');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');



/**
 * 启动开发服务器
 * @param  {Object} webpackConf webpack 配置项
 */
module.exports.start = function start(webpackConf) {
    console.log(chalk.white.bold('SERVER: Starting dev server\n'));

    const address = 'localhost';
    const port = 3000;
    const app = express();
    const compiler = webpack(webpackConf);
    const devMiddleware = webpackDevMiddleware(compiler, {
        publicPath: webpackConf.output.publicPath,
        stats: {
            colors: true,
            chunks: false
        }
    });
    const hotMiddleware = webpackHotMiddleware(compiler, {
        log: () => {},
        heartbeat: 2000
    });

    // force page reload when html-webpack-plugin template changes
    // support live reload
    compiler.plugin('compilation', (compilation) => {
        compilation.plugin('html-webpack-plugin-after-emit', (data, callback) => {
            hotMiddleware.publish({
                action: 'reload'
            });

            callback();
        });
    });

    // serve webpack bundle output
    app.use(devMiddleware);

    // enable hot-reload and state-preserving
    // compilation error display
    app.use(hotMiddleware);

    // enable express.static
    app.use(express.static('test/fakedata'));

    devMiddleware.waitUntilValid(() => {
        console.log(chalk.green.bold('\nSERVER: SUCCESS, listening at http://%s:%s/'),
            address, port);
    });

    // do not set address, it will restrict remote access
    app.listen(port, (error) => {
        if (error) {
            console.log(chalk.red.bold('\nSERVER: FAILED'));

            throw error;
        }

        opn(`http://${address}:${port}/`);
    });
};
