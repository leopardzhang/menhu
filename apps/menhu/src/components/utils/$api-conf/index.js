import $apiConf from '@components/utils/$api-conf';
import $schemas from '../$schemas';



export default Object.assign({
    WEATHERS_GET: {

        /**
         * 接口名称，用于在状态树中保存该接口相关信息
         * @type {String}
         */
        name: 'WEATHERS_GET',

        /**
         * 请求参数
         * @type {Object}
         */
        proxy: {
            url: 'https://query.yahooapis.com/v1/public/yql',
            method: 'GET',
            dataType: 'json',
            data: {
                format: 'json'
            }
        },

        /**
         * 格式化函数，用于处理非标准接口响应
         * @param {Object} response 原始响应
         * @return {Object} 格式化响应
         */
        format(response) {
            return response.query.count ? {
                code: 0,
                data: Object.assign({
                    created: response.query.created
                }, response.query.results.channel)
            } : {
                code: 1,
                data: response.query.created
            };
        },

        /**
         * 范式化处理 schema
         * @type {Object}
         */
        schema: $schemas.channel
    }
}, $apiConf);
