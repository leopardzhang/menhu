import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {
	notice: {},
	indexData: {}
};

const SET_NOTICE = 'SET_NOTICE';
const SET_INDEXDATA = 'SET_INDEXDATA';

const mutations = {

    /**
     * 设置用户输入
     */
    [SET_NOTICE](state, mutation) {
        state.notice = mutation.payload;
    },

	/**
	 * 设置首页的数据
	 */
	 [SET_INDEXDATA](state, mutation) {
		 state.indexData = mutation.payload;
	 }
};

const actions = {

    /**
     * 设置用户输入
     */
    async setNotice({
        commit
    }, input) {
		commit({
			type: SET_NOTICE,
			payload: input
		});
    },

	/**
	 * 设置首页数据
	 */
	async setIndexData({
		commit
	}, data) {
		commit({
			type: SET_INDEXDATA,
			payload: data
		})
	},

    /**
     * 调用 yahoo 天气接口
     */
    async demoGetWeathers({
        commit,
        dispatch,
        state
    }) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.WEATHERS_GET,
                params: {
                    q: `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${state.input}")`
                }
            });

            commit({
                type: DEMO_SET_RESULT,
                payload: response.result
            });
        } catch (error) {
            commit({
                type: DEMO_SET_RESULT,
                payload: error.code ? '暂无数据，请重新输入' : '请求失败，请输入正确城市名'
            });
        }
    }
};

const getters = {

    /**
     * 获取用户输入
     */
    notice(state) {
        return state.notice;
    },

	/**
	 * 首页数据
	 */
	indexData(state) {
		return state.indexData;
	}
};

export default {
    state,
    mutations,
    actions,
    getters
};
