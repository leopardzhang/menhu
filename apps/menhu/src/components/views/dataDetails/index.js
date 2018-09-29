import { mapActions, mapGetters } from 'vuex';
import $ from 'jquery';
import iView from 'iview';
import $apis from '../$apiconfigs';

import { formatDate } from '../$utils';

export default {
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.table_id = vm.$route.query.table_id;

			const table_id = vm.$route.query.table_id;

			$.ajax({
				url: `${$apis.url}/DataService/kway/data/details`,
				type: 'GET',
				data: {
					table_id,
					userid: vm.userinfo.userId
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
		/**
		 * 验证
		 */
		const validateEndDate = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请选择结束时间'));
			} else {
				if (this.formItem.request_sdate !== '' && value < this.formItem.request_sdate) {
					callback(new Error('结束日期须大于开始日期'));
				}
				callback();
			}
		};

		const validateSndDate = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请选择开始时间'));
			} else {
				if (this.formItem.request_edate !== '' && value > this.formItem.request_edate) {
					callback(new Error('开始日期须小于结束日期'));
				}
				callback();
			}
		};

		const validateTel = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入电话'));
			} else {
				if (!/^\d{11,11}$/.test(value)) {
					callback(new Error('请输入正确的电话号格式'));
				}
				callback();
			}
		};

		const validateRadio = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请选择交换方式'));
			} else {
				callback();
			}
		};

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
			],

			dataColumns: [],
			dataTable: {},
			count: 10,

			showModel: false,

			formItem: {
				table_id: null,
				table_name: null,
                contacts_name: '',
				contacts_tel: '',
                exchange_type: '',
                request_sdate: '',
                request_edate: '',
                request_purpose: '',
				file_path: '',
				cuserid: null,
				request_orgId: null
            },

			ruleValidate: {
				contacts_name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				],
				contacts_tel: [
					{ validator: validateTel, required: true, trigger: 'blur' }
				],
				exchange_type: [
					{ validator: validateRadio, required: true, trigger: 'change' }
				],
				request_sdate: [
					{ validator: validateSndDate, required: true, trigger: 'blur' }
				],
				request_edate: [
					{ validator: validateEndDate, required: true, trigger: 'blur' }
				],
				request_purpose: [
					{ required: true, message: '请填写申请用途', trigger: 'blur' }
				]
			},

			exchangeList: [],

			baseUrl: $apis,

			offset: 1,
			limit: 10,

			btnList: {},
			btnType: [
				{
					name: 'Excelzippath',
					type: 'primary'
				},
				{
					name: 'Jsonzippath',
					type: 'success'
				},
				{
					name: 'Xmlzippath',
					type: 'warning'
				}
			]
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
			url: `${$apis.url}/DataService/kway/data/getExchangeType`,
			type: 'GET',
			success(res) {
				_this.exchangeList = res.data;
			},
			fail(err) {
				console.log(err);
			}
		});
	},

	methods: {
		changeTab(index) {
			this.tabIndex = index;
			if(index == 2) {
				this.dataScan();
			} else if(index == 3) {
				this.checkDownload()
			}
		},

		/**
		 * 订阅/取消订阅
		 */
		handleClick() {
			const table_id = this.tableData.dataList.table_id;
			const metadata_subscription_id = this.tableData.dataList.dy_id;
			const user_id = this.userinfo.userId;
			const data = {
				table_id,
				user_id,
				metadata_subscription_id
			}

			if(this.tableData.dataList.dyzt != '1') {
				this.subscribe(data);
			} else {
				this.dissubscribe(data);
			}
		},

		/**
		 * 订阅
		 */
		subscribe(data) {
			const _this = this;

			$.ajax({
				url: `${$apis.url}/DataService/kcata/subscription/save`,
				type: 'GET',
				data,
				success(res) {
					if(res.data == 0) {
						_this.$Message.success('订阅成功');
						_this.tableData.dataList.dyzt = 1;
						_this.fetchData();
					} else {
						_this.$Message.error('订阅失败！请联系管理员或刷新后重试');
					}
				},
				fail(err) {
					console.log(err);
				}
			})
		},

		/**
		 * 取消订阅
		 */
		dissubscribe(data) {
			const _this = this;

			$.ajax({
				url: `${$apis.url}/DataService/kway/data/upd`,
				type: 'GET',
				data,
				success(res) {
					if(res.data == 1) {
						_this.$Message.success('已取消订阅');
						_this.tableData.dataList.dyzt = 0;
						_this.fetchData();
					} else {
						_this.$Message.error('操作失败！请联系管理员或刷新后重试');
					}
				},
				fail(err) {
					console.log(err);
				}
			})
		},

		fetchData() {
			const _this = this;

			const table_id = this.$route.query.table_id;
			$.ajax({
				url: `${$apis.url}/DataService/kway/data/details`,
				type: 'GET',
				data: {
					table_id,
					userid: _this.userinfo.userId
				},
				success(res) {
					_this.tableData = res.data;
				},
				fail(err) {
					console.log(err);
				},
				complete() {
					_this.loading = false;
				}
			});
		},

		/**
		 * 提交
		 */
		handleSubmit (name, sts) {
			const _this = this;

			_this.formItem.sts = sts;

            this.$refs[name].validate((valid) => {
                if (valid) {
					$.each(_this.formItem, function(index, value) {
						if(/date/.test(index)) {
							_this.formItem[index] = formatDate(value);
						}
					});



					$.ajax({
						url: `${$apis.url}/DataService/kway/data/addDataRequest`,
						type: 'POST',
						contentType: "application/json",
						data: JSON.stringify(_this.formItem),
						success(res) {
							_this.$Message.success('申请成功!');
							_this.showModel = false;
							_this.$refs.model.buttonLoading = false;
						},
						fail(err) {
							console.log(err);
						}
					});
                } else {
					_this.$Message.error('连接超时!请重试或联系管理员');
                    setTimeout(() => {
						_this.$refs.model.buttonLoading = false;
					}, 2000);
                }
            });
		},

		/**
		 * 上传文件的返回
		 */
		fnUploadSuccess(res) {
			this.formItem.file_path = res.data;
		},

		handelApply(table_id, table_name, table_orgid) {
			const _this = this;

			this.$refs['uploadFiles'].clearFiles();
			this.showModel = true;
			this.formItem = $.extend({}, {
				table_id,
				table_name,
				table_orgid,
                contacts_name: '',
				contacts_tel: '',
                exchange_type: 'male',
                request_sdate: '',
                request_edate: '',
                request_purpose: '',
				file_path: '',
				cuserid: _this.userinfo.userId,
				request_orgId: _this.userinfo.orgId,
            });
		},

		dataScan() {
			const _this = this;

			$.ajax({
				url: `${$apis.url}/DataService/kway/detailsIn/datax`,
				type: 'GET',
				data: {
					table_id: _this.table_id,
					orgid: _this.tableData.dataList.org_id,
					offset: _this.offset,
					limit: _this.limit
				},
				success(res) {
					_this.dataColumns = [{
						title: '序号',
						type: 'index',
						align: 'left'
					}];

					$.each(res.rows, function(index, value) {
						const tabName = value.col_name;
						_this.dataColumns.push({
							title: value.col_chinese,
							key: value.col_name
						});
					});

					_this.fetchSecondData();
				}
			});


		},

		fetchSecondData() {
			const _this = this;

			$.ajax({
				url: `${$apis.url}/DataService/kway/data/metadataquery`,
				type: 'GET',
				data: {
					table_id: _this.table_id,
					orgid: _this.tableData.dataList.org_id,
					offset: _this.offset,
					limit: _this.limit,
					userId: _this.userinfo.userId
				},
				success(res) {
					_this.dataTable = res;
				}
			});
		},

		changeSize(size) {
			this.limit = size;
			this.dataScan();
		},

		changePage(page) {
			this.offset = page;
			this.dataScan();
		},

		checkDownload() {
			const _this = this;
			$.ajax({
				url: `${$apis.url}/DataService/kway/details/download`,
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify({table_id: _this.table_id}),
				success(res) {
					console.log(res);
					_this.btnList = res;
				}
			})
		}
	}
}
