import { mapActions, mapGetters } from 'vuex';
import $ from 'jquery';
import iView from 'iview';
import $apis from '../../$apiconfigs';

export default {
	data() {
		return {
			newPassword: '',
			checkPassword: ''
		}
	},

	computed: {
		...mapGetters([
			'userinfo'
		])
	},

	methods: {
		handleSubmit() {
			const _this = this;
			const {
				newPassword,
				checkPassword
			} = this;
			const params = {
				userid: this.userinfo.userId,
				newpass: newPassword
			}

			if(newPassword === checkPassword) {
				$.ajax({
					url: `${$apis.url}/DataService/kway/data/updatepass`,
					type: 'GET',
					data: params,
					success(res) {
						if(res == 0) {
							_this.$Message.success('密码修改成功');
						}
					},
					fail(err) {
						console.log(err);
					}
				})
			} else {
				this.$Message.warning('两次输入密码不一致');
			}
		}
	}
}
