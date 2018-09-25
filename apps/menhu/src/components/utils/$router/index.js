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
		path: '/personal',
        name: 'personal',
        component(resolve) {
            require.ensure(['../../views/personal/index.vue'], () => {
                resolve(require('../../views/personal/index.vue'));
            }, 'static/views/personal/index');
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
