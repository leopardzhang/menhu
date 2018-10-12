import iView from 'iview';
import Swiper from 'swiper';
import $ from 'jquery';
import { mapActions, mapGetters } from 'vuex';
import $apis from '../$apiconfigs';

export default {
	data() {
		return {
			value: '',
			imgSrc: '',

			username: '',
			password: '',
			validateCode: '',
			currentUserId: '',
			keyword: '',
			searchType: '0'
		}
	},

	methods: {
		...mapActions([
			'setNotice',
			'setIndexData',
			'getUserInfo',
			'removeUserInfo'
		]),

		loginShow() {
			this.changeImg();

			$('.land_box, .masker').fadeIn();
		},

		loginHide() {
			$('.land_box, .masker').fadeOut();
		},

		/**
		 * 更换验证码图片
		 */
		changeImg() {
			const step = new Promise((resolve, reject) => {
				$.ajax({
					url: `${$apis.url}/DataService//kway/data/getUserValidate`,
					type: 'GET',
					success(res) {
						resolve(res.code);
					},
					fail(err) {
						console.log(err);
					}
				});
			});

			step.then((code) => {
				this.currentUserId = code;
				this.imgSrc = `${$apis.url}/DataService//kway/data/captchamage/${code}`;
			});
		},

		/**
		 * 登录
		 */
		login() {
			const _this = this;
			const {
				username,
				password,
				validateCode,
				currentUserId
			} = this;

			$.ajax({
				url: `${$apis.url}/DataService//kway/data/loginUser`,
				type: 'POST',
				data: {
					username,
					password,
					validateCode,
					currentUserId
				},
				success(res) {
					if(res.code == 0) {		//成功
						const userinfo = res.data;
						const temp = JSON.stringify(userinfo);

						_this.loginHide();
						_this.$Message.success('登陆成功');
						localStorage.setItem('userinfo', temp);
						_this.getUserInfo();
					} else {
						_this.$Message.error(res.errMsg);
					}
				},
				fail(err) {
					console.log(err);
				},
				complete() {
					_this.clearUserInfo();
				}
			});
		},

		/**
		 * 清除登录框信息
		 */
		clearUserInfo() {
			this.username = this.password = this.validateCode = this.currentUserId = '';
		},

		/**
		 * 退出登录状态
		 */
		exit() {
			this.removeUserInfo().then(() => {
				this.$Message.success('您已成功退出');
				this.getUserInfo();
			});
		},

		handleSearch() {
			const p1 = new Promise((resolve, reject) => {
				this.$router.push({
					path: '/loading'
				});
				setTimeout(() => {
					resolve();
				}, 10);
			}).then(() => {
				this.$router.push({
					path: '/search',
					query: {
						keyword: this.keyword,
						type: this.searchType
					}
				});
			})
		},

		/**
		 * 暂未开放
		 */
		notShow() {
			this.$Message.warning('该模块暂未开放');
		}
	},
	computed: {
		...mapGetters([
			'notice',
			'demoInput',
            'demoResult',
			'userinfo'
		])
	},
	beforeCreate() {

		const _this = this;
		$.ajax({
		    url: `${$apis.url}/DataService/kway/data/index`,
		    type: 'GET',
		    data: {},
			success(res) {
				const {
					orgcount,
					resoucout,
					resoudata,
					hotdata,
					recodata,
					update_date,
					orgs,
					findTableTypeAll
				} = res.data;

				let notice = {
					orgcount,
					resoucout,
					resoudata
				}

				_this.setNotice(notice);
				_this.setIndexData({
					hotdata,
					recodata,
					update_date,
					orgs,
					findTableTypeAll
				});
			},
			fail(err) {
				console.log(err);
			}
		});
	},

	mounted() {
		this.getUserInfo();

		const userinfo = this.userinfo;

		if(userinfo) {
			this.$Notice.success({
                title: '提示',
                desc: '已为您自动登录',
				durning: 5000
            });
		}


		const swiper = new Swiper('.swiper-container', {
	        pagination: '.swiper-pagination',
	        paginationClickable: true,
	        autoplay: true,
	        delay: 3000,
	        spaceBetween: 0,
	        loop: true,
	        navigation: {
	            nextEl: '.swiper-button-next',
	            prevEl: '.swiper-button-prev',
	        },
	        pagination: {
	            el: '.swiper-pagination',
				clickable: true
	        }
	    });
	}
}
