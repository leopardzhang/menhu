import $ from 'jquery';
import iView from 'iview';
import $apis from '../$apiconfigs';
import { mapActions, mapGetters } from 'vuex';

export default {
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.keyword = vm.$route.query.keyword;
		});
	},

	data() {
		return {
			keyword: '',
			page: 1,
			count: 10,
			type: 0,
			orgId: '',

			rightData: null
		}
	},

	computed: {
		...mapGetters([
			'indexData'
        ])
	},

	created() {
		this.getRightListData().then((res) => {
			console.log(res);
			this.rightData = res;
		});
	},

	methods: {
		/**
		 * 翻页
		 */
		changePage(page) {
			this.page = page;

			this.getRightListData().then((res) => {
				this.rightData = res;
			});
		},

		/**
		 * 改变每一页的数量
		 */
		changeSize(size) {
			this.count = size;

			this.getRightListData().then((res) => {
				this.rightData = res;
			});
		},

		/**
		 * 更新数据事件
		 */
		async getRightListData() {
			const _this = this;
			const response = await $.ajax({
				url: `${$apis.url}/DataService/kway/data/search`,
				data: {
					page: _this.page,
					count: _this.count,
				},
				type: 'GET',
				fail(err) {
					console.log(err);
				}
			});

			return response;
		}
	}
}
