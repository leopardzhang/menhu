/* eslint global-require: 0 */
import Vue from 'vue';
import VueRouter from 'vue-router';



// 加载 vue-router
Vue.use(VueRouter);

/**
 * 路由规则，各页面 vm 均采用异步组件方式实现
 * see:
 * http://webpack.github.io/docs/code-splitting.html#defining-a-split-point
 * https://github.com/vuejs/vue-router/issues/215
 *
 * and here we use CommonJS syntax, see:
 * http://www.it165.net/pro/html/201603/62608.html
 * http://webpack.github.io/docs/code-splitting.html#named-chunks
 */
const router = new VueRouter({
    routes: [{
        path: '/',
        redirect: {
            name: 'index'
        }
    }, {
        path: '/index',
        name: 'index',
        component(resolve) {
            require.ensure(['../../views/index/index.vue'], () => {
                resolve(require('../../views/index/index.vue'));
            }, 'static/views/index/index');
        }
    }, {
        path: '/dataMenu',
        name: 'dataMenu',
        component(resolve) {
            require.ensure(['../../views/dataMenu/index.vue'], () => {
                resolve(require('../../views/dataMenu/index.vue'));
            }, 'static/views/dataMenu/index');
        }
    }, {
        path: '/dataDetails',
        name: 'dataDetails',
        component(resolve) {
            require.ensure(['../../views/dataDetails/index.vue'], () => {
                resolve(require('../../views/dataDetails/index.vue'));
            }, 'static/views/dataDetails/index');
        }
    }, {
        path: '/apiMenu',
        name: 'apiMenu',
        component(resolve) {
            require.ensure(['../../views/apiMenu/index.vue'], () => {
                resolve(require('../../views/apiMenu/index.vue'));
            }, 'static/views/apiMenu/index');
        }
    }, {
        path: '/apiDetails',
        name: 'apiDetails',
        component(resolve) {
            require.ensure(['../../views/apiDetails/index.vue'], () => {
                resolve(require('../../views/apiDetails/index.vue'));
            }, 'static/views/apiDetails/index');
        }
    }, {
		path: '/search',
        name: 'search',
        component(resolve) {
            require.ensure(['../../views/search/index.vue'], () => {
                resolve(require('../../views/search/index.vue'));
            }, 'static/views/search/index');
        }
	}, {
		path: '/dataShare',
        name: 'dataShare',
        component(resolve) {
            require.ensure(['../../views/dataShare/index.vue'], () => {
                resolve(require('../../views/dataShare/index.vue'));
            }, 'static/views/dataShare/index');
        }
	}, {
		path: '/search',
        name: 'search',
        component(resolve) {
            require.ensure(['../../views/search/index.vue'], () => {
                resolve(require('../../views/search/index.vue'));
            }, 'static/views/search/index');
        }
	}, {
		path: '/personal',
        name: 'personal',
        component(resolve) {
            require.ensure(['../../views/personal/index.vue'], () => {
                resolve(require('../../views/personal/index.vue'));
            }, 'static/views/personal/index');
        },
		children: [{
			path: '/',
	        redirect: {
	            name: 'password'
	        }
		},{
	        path: '/password',
	        name: 'password',
	        component(resolve) {
	            require.ensure(['../../views/personal/password/index.vue'], () => {
	                resolve(require('../../views/personal/password/index.vue'));
	            }, 'static/views/personal/password/index');
	        }
	    },{
	        path: '/apply',
	        name: 'apply',
	        component(resolve) {
	            require.ensure(['../../views/personal/apply/index.vue'], () => {
	                resolve(require('../../views/personal/apply/index.vue'));
	            }, 'static/views/personal/apply/index');
	        }
	    },{
	        path: '/subscribe',
	        name: 'subscribe',
	        component(resolve) {
	            require.ensure(['../../views/personal/subscribe/index.vue'], () => {
	                resolve(require('../../views/personal/subscribe/index.vue'));
	            }, 'static/views/personal/subscribe/index');
	        }
	    }]
	}, {
		path: '/about',
		name: 'about',
		component(resolve) {
			require.ensure(['../../views/about/index.vue'], () => {
				resolve(require('../../views/about/index.vue'));
			}, 'static/views/about/index');
		}
	}]
});

router.beforeEach((to, from, next) => {

    // 系统初始化逻辑
    next();
});

router.afterEach(() => {

    // 切换页面后将屏幕滚动至顶端
    window.scrollTo(0, 0);
});

export default router;
