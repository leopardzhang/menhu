const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const autoprefixer = require('autoprefixer');
const px2rem = require('postcss-px2rem');
const manifest = require('../../apps/common/dist/manifest.json');



// paths
const rootPath = path.join(__dirname, '../..');
const commonComponentsPath = path.join(rootPath, 'apps/common/src/components');
const commonTestPath = path.join(rootPath, 'apps/common/test');
const contextPath = path.join(rootPath, `apps/${process.env.npm_package_name}`);
const componentsPath = path.join(contextPath, 'src');
const distPath = path.join(contextPath, 'dist');

// postcss plugins
const postcssPlugins = [
    autoprefixer({
        browsers: ['last 2 versions', 'Android >= 4.0', 'iOS 8']
    })
];

if (process.env.npm_package_config_platform === 'mobile') {
    postcssPlugins.push(
        px2rem({
            remUnit: 75
        })
    );
}

// webpack config
const webpackBaseConf = {
    context: contextPath,
    entry: {
        'static/utils/index': glob.sync('./src/components/utils/*/*.*', {
            cwd: contextPath
        }),
        'static/index': './src/index.js'
    },
    output: {
        path: distPath
    },
    resolve: {
        extensions: ['.vue', '.js', '.scss', '.css', '.json'],
        alias: {
            '@components': commonComponentsPath,
            '@test': commonTestPath
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            include: [componentsPath, commonComponentsPath],
            use: [{
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: 'vue-style-loader!css-loader!sass-loader'
                    },
                    postcss: postcssPlugins
                }
            }]
        }, {
            test: /\.vue$/,
            include: /node_modules/,
            use: ['vue-loader']
        }, {
            test: /\.js$/,
            include: [componentsPath, commonComponentsPath],
            use: ['babel-loader']
        }, {
            test: /\.css$/,
            include: [componentsPath, commonComponentsPath],
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader',
                options: {
                    plugins: postcssPlugins
                }
            }]
        }, {
            test: /\.css$/,
            include: /node_modules/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }]
        }, {
            test: /\.scss$/,
            include: [componentsPath, commonComponentsPath],
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader',
                options: {
                    plugins: postcssPlugins
                }
            }, {
                loader: 'sass-loader'
            }]
        }]
    },
    plugins: [

        // dll
        new webpack.DllReferencePlugin({
            context: rootPath,
            manifest
        }),

        // combo
        new webpack.optimize.CommonsChunkPlugin({
            name: 'static/utils/index',
            chunks: ['static/utils/index', 'static/index']
        }),

        ...glob.sync('./src/components/widgets/*/*.*', {
            cwd: contextPath
        }).map(chunk => new webpack.optimize.CommonsChunkPlugin({
            name: 'static/utils/index',
            chunks: ['static/utils/index', chunk]
        })),

        ...glob.sync('./src/components/views/*/index.vue', {
            cwd: contextPath
        }).map(chunk => new webpack.optimize.CommonsChunkPlugin({
            name: 'static/utils/index',
            chunks: ['static/utils/index', `static/views/${chunk.slice(0, -4)}`]
        })),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'static/runtime/index'
        })
    ]
};

module.exports = webpackBaseConf;
