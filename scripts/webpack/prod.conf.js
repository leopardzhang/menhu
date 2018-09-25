/* eslint import/newline-after-import: off */
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const webpackBaseConf = require('./base.conf.js');
const defaultProdConf = require('../../configs/prod.conf.js');
const appProdConf = require(`../../apps/${process.env.npm_package_name}/configs/prod.conf.js`);



// production config
const prodConf = merge(defaultProdConf, appProdConf);

// paths
const publicPath = prodConf.build.publicPath;
const libsFilePath = prodConf.build.libsFilePath;
const libsPublicPath = prodConf.build.libsPublicPath;
const assetsPublicPath = prodConf.build.assetsPublicPath;

// webpack config
const webpackProdConf = {
    devtool: false,
    output: {
        filename: '[name].[chunkhash:8].js',
        chunkFilename: '[name].[chunkhash:8].js',
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
        new webpack.DefinePlugin(prodConf.env),

        // https://webpack.js.org/guides/migrating/#uglifyjsplugin-sourcemap
        new webpack.optimize.UglifyJsPlugin(),

        // https://webpack.js.org/guides/migrating/#uglifyjsplugin-minimize-loaders
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),

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
            chunksSortMode: 'dependency',
            minify: {

                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        })
    ]
};

module.exports = merge(webpackBaseConf, webpackProdConf);
