import $ from 'jquery';
import iView from 'iview';
import $apis from '../$apiconfigs';
import { mapActions, mapGetters } from 'vuex';

export default {
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
			keyword: '',
			page: 1,
			count: 10,
			type: 0,
			orgId: '',

			rightData: null,

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

			column: [
                {
                    title: '信息项中文名',
                    key: 'col_chinese'
                },
                {
                    title: '信息项代码',
                    key: 'col_code'
                },
                {
                    title: '数据类型',
                    key: 'field_type_name'
                },
                {
                    title: '是否向社会开放',
                    key: 'public_type_String'
                },
                {
                    title: '共享类型',
                    key: 'share_type_String'
                }
            ],
			tabData: [],
			type: null
		}
	},

	computed: {
		...mapGetters([
			'indexData',
			'userinfo'
        ])
	},

	created() {
		console.log(this.$route);
		this.getRightListData().then((res) => {
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
			const userid = this.userinfo ? this.userinfo.userId : null;
			const [keyword, type] = [this.$route.query.keyword, this.$route.query.type];
			this.type = type;

			const response = await $.ajax({
				url: `${$apis.url}/DataService/kway/data/search`,
				data: {
					page: _this.page,
					count: _this.count,
					type,
					keyword,
					userid
				},
				type: 'GET',
				fail(err) {
					console.log(err);
				}
			});

			return response;
		},

		/**
		 * 订阅/取消订阅
		 */
		handleClick(id, type, index) {
			if(this.userinfo) {
				const table_id = id;
				const metadata_subscription_id = id;
				const user_id = this.userinfo.userId;
				const data = {
					table_id,
					user_id,
					metadata_subscription_id
				}
				if(type) {
					this.subscribe(data, index);
				} else {
					this.dissubscribe(data, index);
				}
			} else {
				this.$Message.warning('请先登录后再进行此操作');
			}
		},

		/**
		 * 订阅
		 */
		subscribe(data, index) {
			const _this = this;

			$.ajax({
				url: `${$apis.url}/DataService/kcata/subscription/save`,
				type: 'GET',
				data,
				success(res) {
					if(res.data == 0) {
						_this.$Message.success('订阅成功');
						_this.rightData.rows[index].dyzt = 1;
						_this.getRightListData().then((res) => {
							_this.loading = false;
							_this.rightData = res.data;
						});
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
		dissubscribe(data, index) {
			const _this = this;

			$.ajax({
				url: `${$apis.url}/DataService/kway/data/upd`,
				type: 'GET',
				data,
				success(res) {
					if(res.data == 1) {
						_this.getRightListData().then((res) => {
							_this.loading = false;
							_this.rightData = res.data;
						});
						_this.$Message.success('已取消订阅');
						_this.rightData.rows[index].dyzt = 0;
					} else {
						_this.$Message.error('操作失败！请联系管理员或刷新后重试');
					}
				},
				fail(err) {
					console.log(err);
				}
			})
		},

		/**
		 * 提交
		 */
		handleSubmit (name, sts) {
			const _this = this;

			this.formItem.sts = sts;
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

		/**
		 * 申请
		 */
		handelApply(table_id, table_name, table_orgid) {
			const _this = this;

			if(this.userinfo) {
				$.ajax({
					url: `${$apis.url}/DataService/kway/data/metadataColsQequest`,
					type: 'GET',
					data: {
						table_id
					},
					success(res) {
						_this.tabData = res.rows;
					}
				});

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
			} else {
				this.$Message.warning('请先登录后再进行此操作');
			}
		}
	}
}
