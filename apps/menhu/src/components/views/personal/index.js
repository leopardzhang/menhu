import $ from 'jquery';
import iView from 'iview';
import $apis from '../$apiconfigs';
import { mapActions, mapGetters } from 'vuex';

export default {
	beforeRouteEnter(to, from, next) {
		next(vm => {
			const routeName = vm.$route.name;
			let navIndex = null;

			switch (routeName) {
				case 'password':
					navIndex = 0;
					break;
				case 'subscribe':
					navIndex = 1;
					break;
				case 'apply':
					navIndex = 2;
					break;
			}

			vm.navIndex = navIndex;
		});
	},

	data() {
		return {
			navList: [
				{
					name: '修改密码',
					to: 'password'
				},
				{
					name: '我的订阅',
					to: 'subscribe'
				},
				{
					name: '我的申请',
					to: 'apply'
				}
			],

			navIndex: 0
		}
	},

	methods: {
		changeNavIndex(index) {
			this.navIndex = index;
		}
	}
}
