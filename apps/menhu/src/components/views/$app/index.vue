<template>
    <div id="app">
        <div class="page-wrapper">
			<div class="top rel">
		        <header class="header">
		            <div class="content">
		                <div class="logo_box fl">
		                    <a href="javascript:" class="logo">
								<img src="./images/logo_03.png">
							</a>
		                </div>
		                <div class="login_box fr">
		                    <a v-if="!userinfo" @click="loginShow" href="javascript:" class="login" id="login_btn">[ 登录 ]</a>
							<a v-if="userinfo" class="welcome">欢迎您！{{ userinfo.realName }}</a>
							<router-link :to="{ name: 'password' }" class="login">[ 个人中心 ]</router-link>
							<a v-if="!!userinfo" @click="exit" href="javascript:" class="login">[ 退出 ]</a>
		                </div>
		            </div>
		        </header>
		        <nav class="nav">
		            <div class="content">
		                <ul class="nav_list">
		                    <li>
								<router-link :to="{ name: 'index'}">
									<img src="./images/tb_03.png">
									<span>首页</span>
								</router-link>
		                    </li>
		                    <li>
								<router-link :to="{ name: 'dataMenu'}">
									<img src="./images/tb_05.png">
									<span>数据目录</span>
								</router-link>
		                        <!-- <ul>
		                            <li>
		                                <a href="javascript:">数据目录1</a>
		                            </li>
		                            <li>
		                                <a href="javascript:">数据目录2</a>
		                            </li>
		                        </ul> -->
		                    </li>
		                    <li>
								<router-link :to="{ name: 'apiMenu'}">
									<img src="./images/tb_05.png">
									<span>API服务</span>
								</router-link>
		                    </li>
		                    <li>
		                        <a href="javascript:">
									<img src="./images/tb_09.png">
									<span>开放指数</span>
								</a>
		                    </li>
		                    <li>
								<router-link :to="{ name: 'dataShare'}">
									<img src="./images/tb_11.png">
									<span>资料共享</span>
								</router-link>
		                    </li>
		                    <li>
		                        <a href="javascript:">
									<img src="./images/tb_13.png">
									<span>开放动态</span>
								</a>
		                    </li>
		                </ul>
		            </div>
		        </nav>
		        <div class="swiper-container">
		            <div class="swiper-wrapper">
		                <div class="swiper-slide">
		                    <img src="./images/banner1_03.png" />
		                    <img src="./images/banner1_05.png" />
		                </div>
		                <div class="swiper-slide">
		                    <img src="./images/banner2_03.png" />
		                    <img src="./images/banner2_05.png" />
		                </div>
		                <div class="swiper-slide">
		                    <img src="./images/banner3_03.png" />
		                    <img src="./images/banner3_05.png" />
		                </div>
		            </div>
		            <!-- Add navgiation -->
		            <div class="swiper-button-next"></div>
		            <div class="swiper-button-prev"></div>
		            <!-- Add pagination -->
		            <div class="swiper-pagination"></div>
		        </div>
		        <div class="media_box">
		            <div class="content clear">
		                <div class="notice_box fl">
		                    <div class="notice">
		                        <p>已开放：
									<span>{{ notice.resoudata }}</span>条数据；
									<span>{{ notice.resoucout }}</span>个数据资源；
									<span>{{ notice.orgcount }}</span>
								个部门</p>
		                    </div>
		                </div>
		                <div class="search_box fr">
		                    <div class="search">
		                        <input class="text" v-model="keyword" placeholder="请输入关键字" />
		                        <input class="btn" type="button" @click="fnSearch" />
		                    </div>
		                </div>
		            </div>
		        </div>
		    </div>

			<!-- 路由容器 -->
            <router-view></router-view>
        </div>
	    <footer class="footer">
	        <div class="t4_tmenus">
	            <div class="t4_w">
	                <ul>
	                    <li><img src="./images/sg.png" /></li>
	                    <li>
	                        <a href="javascript:">服务条款</a>
	                    </li>
	                    <li><img src="./images/sg.png" /></li>
	                    <li>
	                        <a href="javascript:">友情链接</a>
	                    </li>
	                    <li><img src="./images/sg.png" /></li>
	                    <li>
	                        <a href="javascript:">关于我们</a>
	                    </li>
	                    <li><img src="./images/sg.png" /></li>
	                    <div class="clear"></div>
	                </ul>
	            </div>
	        </div>
	        <div class="content">
	            <p>
	                Copyright © 2014-2017 www.gyopendata.gov.cn All Rights Reserved<br>黑ICP备16010582号 网站访问量：<br>主办单位：佳木斯市大数据发展管理委员会 建设单位：佳木斯市信息产业发展中心<br>(建议使用Chrome、360浏览器(极速模式)，1366*768以上分辨率浏览本站)
	            </p>
	        </div>
	    </footer>
		<!-- 登录 -->
	    <div class="land_box">
	        <div class="land rel">
	            <button @click="loginHide" class="closed" id="close"></button>
	            <p class="title">用户登录</p>
	            <div class="login_table">
	                <table>
	                    <tr>
	                        <td>
	                            <div class="input_box">
	                                <input
										v-model="username"
										type="text"
										placeholder="请输入用户名" />
	                            </div>
	                        </td>
	                    </tr>
	                    <tr>
	                        <td>
	                            <div class="input_box">
	                                <input
										v-model="password"
										type="password"
										placeholder="请输入密码" />
	                            </div>
	                        </td>
	                    </tr>
	                    <tr>
	                        <td>

								<!-- 验证码 -->
	                            <img
									:src="imgSrc"
									@click="changeImg"
									class="fr" alt="">
	                            <div class="input_box" style="width: 220px;">
	                                <input
										v-model="validateCode"
										type="text"
										placeholder="请输入验证码" />
	                            </div>
	                        </td>
	                    </tr>
	                    <tr>
	                        <td>
	                            <input
									@click="login"
									type="button"
									class="btn"
									value="登录">
	                        </td>
	                    </tr>
	                </table>
	            </div>
	        </div>
	    </div>
	    <div class="masker" @click="loginHide"></div>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>
