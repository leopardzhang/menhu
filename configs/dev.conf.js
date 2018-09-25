const path = require('path');



module.exports = {

    // 环境变量
    env: {

        // 构建模式
        // http://vuejs.org/guide/application.html#Deploying_for_Production
        // http://vue-loader.vuejs.org/en/workflow/production.html
        'process.env': {
            NODE_ENV: '"development"'
        }
    },

    // 构建变量
    build: {

        // 部署阶段文件加载路径
        publicPath: '',

        // 构建阶段库文件读取路径
        libsFilePath: path.join(__dirname, '../apps/common/dist'),

        // 部署阶段库文件加载路径
        libsPublicPath: 'static/libs',

        // 部署阶段资源文件加载路径
        assetsPublicPath: 'static/assets/'
    }
};
