import $ from 'jquery';
import iView from 'iview';
import $apis from '../$apiconfigs';

export default {
	beforeRouteEnter(to, from, next) {
		next(vm => {
			const params = vm.$route.query;

			vm.table_id = params.table_id;
			vm.fl = params.fl || 0;
			vm.table_type_sid = params.table_type_sid || null;
			vm.table_type_branchid = params.table_type_branchid || null;

		});
	},

	data() {
		return {
			loading: true,
			loadingRight: false,

			tableData: [],

			tabList: [
				{
					name: '主题'
				},
				{
					name: '部门'
				},
				{
					name: '基础'
				}
			],
			fl: 0,
			tableShowData: [],

			rightData: {},

			//右侧分类的数据
			orderList: [
				{
					name: '更新时间'
				},
				{
					name: '访问量'
				},
				{
					name: '下载量'
				}
			],
			order: 0,

			page: 1,
			count: 10,
			table_type_id: null,
			table_type_branchid: null,
			table_type_sid: null,
			userid: null
		}
	},

	created() {
		const _this = this;

		$.ajax({
			url: `${$apis.url}/DataService/kway/data/sjdetail_type`,
			type: 'GET',
			data: {},
			success(res) {
				const {
					tableJc,
					tableOrg,
					tableType
				} = res.data;

				_this.tableData[0] = _this.tableShowData = tableType;
				_this.tableData[1] = tableOrg;
				_this.tableData[2] = tableJc;
				_this.getRightListData().then((res) => {
					_this.loading = false;
					_this.rightData = res.data;
				});
			},
			fail(err) {
				console.log(err);
			}
		});
	},

	methods: {
		/**
		 * 切换左侧tab事件
		 */
		changeTab(fl) {
			this.loadingRight = true;
			this.fl = fl;
			this.tableShowData = this.tableData[fl];
			this.setFl(fl);

			this.getRightListData().then((res) => {
				this.rightData = res.data;
				this.loadingRight = false;
			});
		},

		changeOrder(index) {
			this.loadingRight = true;
			this.order = index;
			this.getRightListData().then((res) => {
				this.rightData = res.data;
				this.loadingRight = false;
			});
		},

		/**
		 * 点击左侧项目事件
		 */
		changeFlClass(e) {
			const id = e.target.dataset.id;
			const fl = this.fl;

			this.loadingRight = true;
			switch (fl) {
				case 0:
					this.table_type_sid = id;
					break;
				case 1:
					this.table_type_branchid = id;
					break;
				case 2:
					this.table_type_id = id;
					break;
			}

			this.getRightListData().then((res) => {
				this.rightData = res.data;
				this.loadingRight = false;
			});
		},

		/**
		 * 设置Fl
		 */
		setFl(type) {
			switch (type) {
				case 0:
					this.table_type_branchid = null;
					this.table_type_id = null;
					break;
				case 1:
					this.table_type_id = null;
					this.table_type_sid = null;
					break;
				case 2:
					this.table_type_sid = null;
					this.table_type_branchid = null;
					break;
			}
		},

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
			console.log(this);
			const response = await $.ajax({
				url: `${$apis.url}/DataService/kway/data/sjdetail_MetadataTable`,
				data: {
					page: _this.page,
					count: _this.count,
					order: _this.order + 1,
					fl: _this.fl,
					table_type_sid: _this.table_type_sid,
					table_type_id: _this.table_type_id,
					table_type_branchid: _this.table_type_branchid,
					userid: _this.userid
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
