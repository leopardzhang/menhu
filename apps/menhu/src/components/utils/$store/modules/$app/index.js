const state = {
	userinfo: null
};

const GET_USER_INFO = 'GET_USER_INFO';

const mutations = {
	[GET_USER_INFO](state, mutation) {
		state.userinfo = mutation.payload;
	}
};

const actions = {
	getUserInfo({
		commit
	}) {
		const userinfo = JSON.parse(localStorage.getItem('userinfo'));

		commit({
			type: GET_USER_INFO,
			payload: userinfo
		});
	},

	async removeUserInfo({
		commit
	}) {
		await localStorage.removeItem('userinfo');
		commit({
			type: GET_USER_INFO,
			payload: null
		});
	}
};

const getters = {
	userinfo(state) {
		return state.userinfo;
	}
};

export default {
    state,
    mutations,
    actions,
    getters
};
