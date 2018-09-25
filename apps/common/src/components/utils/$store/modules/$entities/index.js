import Vue from 'vue';
import util from 'util';



const state = {};

const $ENTITIES_SET = '$ENTITIES_SET';
const $ENTITIES_REMOVE = '$ENTITIES_REMOVE';
const $ENTITIES_CLEAR = '$ENTITIES_CLEAR';

const mutations = {

    /**
     * 设置实体数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$ENTITIES_SET](state, mutation) {
        const payload = mutation.payload;

        for (const [key, value] of Object.entries(payload)) {
            if (util.isObject(value)) {
                Vue.set(state, key, Object.assign({}, state[key], value));
            }
        }
    },

    /**
     * 清除实体数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$ENTITIES_REMOVE](state, mutation) {
        const payload = mutation.payload;

        if (util.isObject(state[payload])) {
            Vue.delete(state, payload);
        }
    },

    /**
     * 清空实体数据
     * @param {Object} state state
     */
    [$ENTITIES_CLEAR](state) {
        for (const key of Object.keys(state)) {
            Vue.delete(state, key);
        }
    }
};

const actions = {

    /**
     * 设置实体数据
     * @param {Object} context context
     * @param {Object} entities 实体数据
     */
    async $entitiesSet({
        commit
    }, entities) {
        if (util.isObject(entities)) {
            commit({
                type: $ENTITIES_SET,
                payload: entities
            });
        } else {
            throw new Error('[$entitiesSet] invalid entities');
        }
    },

    /**
     * 清除实体数据
     * @param {Object} context context
     * @param {String} key 需要清除的实体名称
     */
    async $entitiesRemove({
        commit
    }, key) {
        commit({
            type: $ENTITIES_REMOVE,
            payload: key
        });
    },

    /**
     * 设置实体数据
     * @param {Object} context context
     */
    async $entitiesClear({
        commit
    }) {
        commit({
            type: $ENTITIES_CLEAR
        });
    }
};

const getters = {

    /**
     * 获取实体数据
     * @param {Object} state state
     * @return {Object} 实体数据
     */
    $entities(state) {
        return state;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
