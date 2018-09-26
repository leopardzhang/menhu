import $ from 'jquery';
import iView from 'iview';
import $apis from '../$apiconfigs';
import { mapActions, mapGetters } from 'vuex';

export default {
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
