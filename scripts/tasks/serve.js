const webpack = require('webpack');
const merge = require('webpack-merge');
const argv = require('minimist')(process.argv.slice(2));
const server = require('../dev-server/server.js');
const webpackDevConf = require('../webpack/dev.conf.js');
const webpackProdConf = require('../webpack/prod.conf.js');



if (argv.dev) {

    // add hot-reload related code to entry chunks
    // IMPORTANT! DO NOT modify module.exports directly, it will works on all exports
    const entry = webpackDevConf.entry;
    const devEntry = {};

    Object.keys(entry).forEach((key) => {

        // https://github.com/vuejs-templates/webpack/blob/dist/template/build/webpack.dev.conf.js
        // http://webpack.github.io/docs/configuration.html#entry
        devEntry[key] = ['../../scripts/dev-server/client'].concat(entry[key]);
    });

    server.start(merge.strategy({
        entry: 'replace',
        plugins: 'append'
    })(webpackDevConf, {
        entry: devEntry,
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ]
    }));
} else if (argv.prod) {
    server.start(webpackProdConf);
}
