const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const defaultDevConf = require('../../configs/dev.conf.js');
const appDevConf = require('../../apps/common/configs/dev.conf.js');
const defaultProdConf = require('../../configs/prod.conf.js');
const appProdConf = require('../../apps/common/configs/prod.conf.js');
const appDllConf = require('../../apps/common/configs/dll.conf.js');



// development & production configs
const devConf = merge(defaultDevConf, appDevConf);
const prodConf = merge(defaultProdConf, appProdConf);

// paths
const rootPath = path.join(__dirname, '../..');
const nodeModulesPath = path.join(rootPath, 'node_modules');
const distPath = path.join(rootPath, 'apps/common/dist');
const manifestPath = path.join(distPath, 'manifest.json');

// webpack config
const webpackDllConf = {
    entry: {
        libs: appDllConf
    },
    output: {
        path: distPath,
        filename: 'index.js',
        library: '[name]_[chunkhash:8]'
    },
    resolve: {
        extensions: ['.vue', '.js', '.css'],
        modules: [nodeModulesPath]
    },
    module: {
        rules: [{
            test: /\.vue$/,
            include: [nodeModulesPath],
            use: ['vue-loader']
        }, {
            test: /\.css$/,
            include: [nodeModulesPath],
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(png|jpg|gif|ico)$/,
            include: [nodeModulesPath],
            use: ['url-loader']
        }, {
            test: /\.(woff|woff2|otf|svg|eot|ttf)(\?#(iefix|fontawesomeregular))?$/,
            include: [nodeModulesPath],
            use: ['url-loader']
        }]
    },
    plugins: [
        new webpack.DllPlugin({
            path: manifestPath,
            name: '[name]_[chunkhash:8]',
            context: rootPath
        })
    ]
};

if (argv.prod) {
    webpackDllConf.plugins.push(
        new webpack.DefinePlugin(prodConf.env),

        // https://webpack.js.org/guides/migrating/#uglifyjsplugin-sourcemap
        new webpack.optimize.UglifyJsPlugin(),

        // https://webpack.js.org/guides/migrating/#uglifyjsplugin-minimize-loaders
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    );
} else if (argv.dev) {
    webpackDllConf.plugins.push(
        new webpack.DefinePlugin(devConf.env)
    );
}

module.exports = webpackDllConf;
