/* eslint import/newline-after-import: off */
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const webpackBaseConf = require('./base.conf.js');
const defaultDevConf = require('../../configs/dev.conf.js');
const appDevConf = require(`../../apps/${process.env.npm_package_name}/configs/dev.conf.js`);



// development config
const devConf = merge(defaultDevConf, appDevConf);

// paths
const publicPath = devConf.build.publicPath;
const libsFilePath = devConf.build.libsFilePath;
const libsPublicPath = devConf.build.libsPublicPath;
const assetsPublicPath = devConf.build.assetsPublicPath;

// webpack config
const webpackDevConf = {

    // eval-source-map is faster for development, but useless!!!
    devtool: '#cheap-module-eval-source-map',
    output: {

        // can't use chunkhash in dev mode(HMR), it will force the browser reload
        // https://github.com/webpack/webpack/issues/1363
        // https://webpack.github.io/docs/long-term-caching.html#option-2-one-hash-per-chunk
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|ico)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: '[name].[hash:8].[ext]',
                    outputPath: 'static/assets/',
                    publicPath: assetsPublicPath
                }
            }, {
                test: /\.(woff|woff2|otf|svg|eot|ttf)(\?#(iefix|fontawesomeregular))?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[hash:8].[ext]',
                    outputPath: 'static/assets/',
                    publicPath: assetsPublicPath
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin(devConf.env),

        // dll
        new AddAssetHtmlPlugin({
            filepath: require.resolve(path.join(libsFilePath, 'index.js')),
            publicPath: libsPublicPath,
            outputPath: 'static/libs',
            includeSourcemap: false,
            hash: true
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            chunks: [
                'static/runtime/index',
                'static/utils/index',
                'static/index'
            ],
            inject: 'body',
            chunksSortMode: 'dependency'
        })
    ]
};

module.exports = merge(webpackBaseConf, webpackDevConf);
