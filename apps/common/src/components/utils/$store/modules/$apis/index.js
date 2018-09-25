/* global __API__ */
import Vue from 'vue';
import $ from 'jquery';
import util from 'util';
import { normalize } from 'normalizr';
import $cache from '../../../$cache';



const state = {};

const $APIS_CALL = '$APIS_CALL';

const mutations = {

    /**
     * 设置接口状态
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$APIS_CALL](state, mutation) {
        const payload = mutation.payload;

        if (util.isObject(payload)) {
            for (const key in payload) {
                if ({}.hasOwnProperty.call(payload, key)) {
                    if (util.isObject(payload[key])) {
                        Vue.set(state, key, Object.assign({}, state[key], payload[key]));
                    }
                }
            }
        }
    }
};

/**
 * 接口状态，分别对应等待响应、响应成功和响应失败
 * @type {String}
 */
const STATUS_PENDING = 'PENDING';
const STATUS_SUCCESS = 'SUCCESS';
const STATUS_FAILURE = 'FAILURE';

/**
 * 保存各接口请求对应的 jqXHR 对象，用于实现请求取消
 * jqXHR 对象会绕过 mutation 自动改变其状态，因此不在状态树中保存
 * @type {Object}
 */
const _jqXHRs = {};

const actions = {

    /**
     * 调用接口并设置接口状态
     * @param {Object} context context
     * @param {Object} config 接口配置
     * @param {Object} params 请求参数
     * @return {Promise} Promise 对象
     */
    async $apisCall({
        commit,
        dispatch,
        state
    }, {
        config,
        params = {}
    }) {
        if (!util.isObject(config)) {
            throw new Error('[$apisCall] invalid api config');
        }

        const name = config.name;

        if (state[name] && state[name].status === STATUS_PENDING) {

            // 中断尚未收到响应的请求
            _jqXHRs[name].abort();
        }

        let cacheKey = config.cacheKey;
        let cacheValue;
        const useCache = util.isString(cacheKey);

        // 尝试读取已有缓存
        if (useCache) {
            cacheKey = cacheKey.replace(/\{(.[^{}]*)}/g, (value, $1) => params[$1]);
            cacheValue = await $cache.getItem(cacheKey);

            if (!util.isNull(cacheValue)) {
                Object.assign(params, {
                    timestamp: cacheValue.timestamp
                });
            }
        }

        let proxy = config.proxy;

        proxy = $.extend(true, {}, proxy, {
            data: params,

            // 不修改绝对路径
            url: /^http(s)?:\/\//.test(proxy.url) ?
                proxy.url :
                __API__.BASEURL + proxy.url
        });

        const jqXHR = _jqXHRs[name] = $.ajax(proxy);

        commit({
            type: $APIS_CALL,
            payload: {
                [name]: {
                    status: STATUS_PENDING,
                    params: proxy.data
                }
            }
        });

        try {
            // use Promise handle jquery ajax response, see:
            // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
            // https://developers.google.com/web/fundamentals/getting-started/primers/promises#_2
            let response = await Promise.resolve(jqXHR);

            // 判断已有缓存是否有效
            if (useCache) {
                switch (response.code) {
                    case 0:
                        await $cache.setItem(cacheKey, response);
                        break;

                    case 208:
                        response = cacheValue;
                        break;

                    default:
                }
            }

            // 格式化接口响应
            if (util.isFunction(config.format)) {
                response = config.format(response);
            }

            if (response.code === 0) {
                commit({
                    type: $APIS_CALL,
                    payload: {
                        [name]: {
                            status: STATUS_SUCCESS,
                            params: proxy.data,
                            response
                        }
                    }
                });

                const originalData = response.data;

                // 对设置了 schema 的接口响应进行范式化处理
                if (config.schema) {
                    const paradigmData = normalize(originalData, config.schema);

                    await dispatch('$entitiesSet', paradigmData.entities);

                    return paradigmData;
                }

                return originalData;
            }

            throw response;
        } catch (error) {
            let response;

            if (error.code) {
                response = error;
            } else if (error.statusText === 'abort') {
                response = {
                    code: -1,
                    data: `${jqXHR.status}: abort`
                };
            } else {
                response = {
                    code: -2,
                    data: `${jqXHR.status}: ${jqXHR.statusText}`
                };
            }

            commit({
                type: $APIS_CALL,
                payload: {
                    [name]: {
                        status: STATUS_FAILURE,
                        params: proxy.data,
                        response
                    }
                }
            });

            throw response;
        }
    }
};

const getters = {

    /**
     * 获取请求状态
     * @param {Object} state state
     * @return {Object} 请求状态
     */
    $apis(state) {
        return state;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
