import { mapActions, mapGetters } from 'vuex';
import $ from 'jquery';
import $apis from '../$apiconfigs';

export default {
	data() {
		return {
			imgBaseUrl: $apis.imgBaseUrl,
			btnList: [
				{
					name: '主题分类'
				},
				{
					name: '提供部门'
				}
			],
			btnIndex: 0,

			showAll: false,

			showAllImg: false
		}
	},

    computed: {
        ...mapGetters([
            'demoInput',
            'demoResult',
			'indexData'
        ])
    },

    methods: {
		changeIndex(index) {
			this.btnIndex = index;
			if(index == 0) {
				this.showAll = false;
			} else {
				this.showAllImg = false;
			}
		},

		showAllOrgs() {
			this.showAll = !this.showAll;
		},

		showAllImgs() {
			this.showAllImg = !this.showAllImg;
		}
    },

	beforeCreate() {

	}
};
