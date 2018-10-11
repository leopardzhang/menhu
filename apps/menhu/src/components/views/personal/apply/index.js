import { mapActions, mapGetters } from 'vuex';
import $ from 'jquery';
import iView from 'iview';
import $apis from '../../$apiconfigs';

import { formatDate } from '../../$utils';

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
			page: 1,
			count: 10,
			total: null,

			rightData: [],
			formatData(input) {
				let output = null;
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
				return output;
			},

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
			tabData: []
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

	created() {
		this.getRightListData().then((res) => {
			this.rightData = res;
		});
	},

	methods: {
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
		 * 翻页
		 */
		changePage(page) {
			this.page = page;

			this.getRightListData().then((res) => {
				this.rightData = res;
			});
		},
		/**
		 * 更新右侧数据事件
		 */
		async getRightListData() {
			const _this = this;
			const response = await $.ajax({
				url: `${$apis.url}/DataService/kway/data/queryDataRequestList2`,
				data: {
					page: _this.page,
					count: _this.count,
					cuserid: _this.userinfo.userId
				},
				type: 'GET',
				fail(err) {
					console.log(err);
				}
			});

			return response;
		},

		handleCheck(table_id, data_request_id) {
			const _this = this;

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

			$.ajax({
				url: `${$apis.url}/DataService/kway/data/getDataRequestById2`,
				type: 'GET',
				data: {
					data_request_id,
					orgId: _this.userinfo.orgId
				},
				success(res) {
					const temp = res[0];

					temp.exchange_type = parseInt(temp.exchange_type);
					_this.showModel = true;
					_this.formItem = $.extend({}, temp);
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
		}
	}
}
