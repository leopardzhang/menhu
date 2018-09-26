import $ from 'jquery';
import iView from 'iview';
import $apis from '../$apiconfigs';
import { mapActions, mapGetters } from 'vuex';

export default {
	data() {
		return {
			flagType: [2, 1],	//区别参数
			kvId: [41, 42],		//同上
			dataResourceName: '',
			page: 1,
			count: 10,

			rightData: [],

			navIndex: 0,
			dataIndex: 0,
			navChose: 0,
			whichNav: 0,

			navList: [
				{
					name: '目录采集'
				},
				{
					name: '培训课件'
				}
			],

			downloadBaseUrl: null,

			baseUrl: $apis.url
		}
	},

	computed: {
		...mapGetters([
			'userinfo'
		])
	},

	beforeCreate() {
		const _this = this;

		$.ajax({
			url: `${$apis.url}/DataService/kway/data/downpath`,
			type: 'GET',
			success(res) {
				_this.downloadBaseUrl = res.data;
			},
			fail(err) {
				console.log(err);
			}
		})
	},

	created() {
		this.getRightListData().then((res) => {
			this.rightData = res.data;
		});
	},

	methods: {

		/**
		 * 翻页
		 */
		changePage(page) {
			this.loadingRight = true;
			this.page = page;

			this.getRightListData().then((res) => {
				this.rightData = res.data;
			});
		},

		/**
		 * 改变每一页的数量
		 */
		changeSize(size) {
			this.count = size;

			this.getRightListData().then((res) => {
				this.rightData = res.data;
			});
		},

		/**
		 * 更新数据事件
		 */
		async getRightListData() {
			const _this = this;
			const response = await $.ajax({
				url: `${$apis.url}/DataService/kway/data/queryDataResourceList`,
				data: {
					page: _this.page,
					count: _this.count,
					dataResourceName: _this.dataResourceName,
					flagType: _this.flagType[_this.navChose],
					kvId: _this.kvId[_this.navChose==0?_this.navIndex:_this.dataIndex]
				},
				type: 'GET',
				fail(err) {
					console.log(err);
				}
			});

			return response;
		},

		/**
		 * 切换左侧
		 */
		changeNavIndex(index) {		//上面的
			this.navIndex = index;
			this.navChose = 0;

			this.getRightListData().then((res) => {
				this.rightData = res.data;
			});
		},

		changeDataIndex(index) {	//下面的（登录才能看见）
			this.dataIndex = index
			this.navChose = 1;

			this.getRightListData().then((res) => {
				this.rightData = res.data;
			});
		},

		fnSearch() {
			this.getRightListData().then((res) => {
				this.rightData = res.data;
			});
		},

		/**
		 * 点击下载
		 */
		fnDownload(e) {
			const id = e.target.dataset.id;
			const data = JSON.stringify({id});

			$.ajax({
				url: `${$apis.url}/DataService/kway/data/updDataResource`,
				type: 'POST',
				contentType: 'application/json',
				data
			});

			this.getRightListData().then((res) => {
				this.rightData = res.data;
			});
		},

		uploadSuccess() {
			this.$Message.success('上传成功');
		}
	}
}
