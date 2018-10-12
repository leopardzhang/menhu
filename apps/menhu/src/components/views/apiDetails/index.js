import { mapActions, mapGetters } from 'vuex';
import $ from 'jquery';
import iView from 'iview';
import $apis from '../$apiconfigs';

export default {
	data() {
		return {
			tableId: null,
			rightData: null,
			hotDataList: []
		}
	},

	computed: {
		...mapGetters([
			'userinfo'
		])
	},

	created() {
		const _this = this;
		const params = _this.$route.query;
		const tableId = params.tableId;
		const orgId = _this.userinfo ? _this.userinfo.orgId : null;

		$.ajax({
			url: `${$apis.url}/DataService/kway/data/apiQueryInfo`,
			type: 'GET',
			data: {
				tableId,
				orgId
			},
			success(res) {
				_this.rightData = res.data;
					console.log(_this.rightData);
			}
		});

		$.ajax({
			url: `${$apis.url}/DataService//kway/data/hotdata`,
			type: 'GET',
			success(res) {
				_this.hotDataList = res.data;
			}
		});
	},

	methods: {

	}
}
