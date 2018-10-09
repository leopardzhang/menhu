import { mapActions, mapGetters } from 'vuex';
import $ from 'jquery';
import iView from 'iview';
import $apis from '../$apiconfigs';

export default {
	beforeRouteEnter(to, from, next) {
		next(vm => {
			const params = vm.$route.query;
			const tableId = params.tableId;
			const orgId = vm.userinfo.orgId || null;
			$.ajax({
				url: `${$apis.url}/DataService/kway/data/apiQueryInfo`,
				type: 'GET',
				data: {
					tableId,
					orgId
				},
				success(res) {
					vm.rightData = res.data;
				}
			});

			$.ajax({
				url: `${$apis.url}/DataService//kway/data/hotdata`,
				type: 'GET',
				success(res) {
					vm.hotDataList = res.data;
				}
			});
		});
	},
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

	methods: {

	}
}
