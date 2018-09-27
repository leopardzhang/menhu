import $ from 'jquery';
import iView from 'iview';
import $apis from '../$apiconfigs';

export default {
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.table_id = vm.$route.query.table_id;

			const table_id = vm.$route.query.table_id;

			$.ajax({
				url: `${$apis.url}/DataService/kway/data/details`,
				type: 'GET',
				data: {
					table_id
				},
				success(res) {
					vm.tableData = res.data;
				},
				fail(err) {
					console.log(err);
				},
				complete() {
					vm.loading = false;
				}
			});
		});
	},

	data() {
		return {
			loading: true,
			table_id: '',
			tableData: null,

			tab: [{
					name: '信息资源详情'
				},
				{
					name: '信息项'
				},
				{
					name: '资源数据查询'
				},
				{
					name: '资源下载'
				}],

			tabIndex: 0,

			columns: [
				{
					title: '序号',
					type: 'index',
					align: 'left'
				},
				{
					title: '信息项中文名',
					key: 'col_chinese'
				},
				{
					title: '信息项代码',
					key: 'col_code'
				},
				{
					title: '数据格式',
					key: 'field_type_name'

				}
			]
		}
	},

	methods: {
		changeTab(index) {
			this.tabIndex = index;
		}
	}
}
