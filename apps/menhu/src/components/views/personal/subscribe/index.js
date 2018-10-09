import { mapActions, mapGetters } from 'vuex';
import $ from 'jquery';
import iView from 'iview';
import $apis from '../../$apiconfigs';

export default {
	data() {
		return {
			rightData: [],

			page: 1,
			count: 10,
			loadingRight: true,
			formatData (input) {
				let output = '';

				switch (input) {
					case 1:
						output = '草稿'
						break;
					case 2:
						output = '未审核'
						break;
					case 3:
						output = '已审核'
						break;
					case 4:
						output = '驳回'
						break;
				}
				return output
			}
		}
	},

	created() {
		this.getRightListData().then((res) => {
			this.rightData = res.data;
			this.loadingRight = false;
		});
	},

	computed: {
		...mapGetters([
			'userinfo'
		])
	},

	methods: {

		/**
		 * 改变每一页的数量
		 */
		changeSize(size) {
			this.loadingRight = true;
			this.count = size;

			this.getRightListData().then((res) => {
				this.rightData = res.data;
				this.loadingRight = false;
			});
		},

		/**
		 * 翻页
		 */
		changePage(page) {
			this.loadingRight = true;
			this.page = page;

			this.getRightListData().then((res) => {
				this.rightData = res.data;
				this.loadingRight = false;
			});
		},

		/**
		 * 更新右侧数据事件
		 */
		async getRightListData() {
			const _this = this;
			const response = await $.ajax({
				url: `${$apis.url}/DataService/kway/data/getDYData`,
				data: {
					page: _this.page,
					count: _this.count,
					order: 0,
					qtuserid: _this.userinfo.userId
				},
				type: 'GET',
				fail(err) {
					console.log(err);
				}
			});

			return response;
		},

		handleCancel(metadata_subscription_id, index) {
			const _this = this;
			const data = {
				user_id: this.userinfo.userId,
				metadata_subscription_id
			}

			$.ajax({
				url: `${$apis.url}/DataService/kway/data/upd`,
				type: 'GET',
				data,
				success(res) {
					if(res.data == 1) {
						_this.getRightListData().then((res) => {
							_this.rightData = res.data;
						});
						_this.$Message.success('已取消订阅');
					} else {
						_this.$Message.error('操作失败！请联系管理员或刷新后重试');
					}
				},
				fail(err) {
					console.log(err);
				}
			})
		}
	}
}
