<template>
<div class="background">
	<div class="grzx_box">
	    <div class="grzx-left">
	        <div class="grzx-left_title">
	            数据分类
	        </div>
	        <div class="grzx-left_contenr">
	            <ul>
	                <li
						v-for="(item, index) in navList"
						:class="{act: index == navIndex && !navChose}"
						@click="changeNavIndex(index)">
						<a href="javascript:">
							<span></span>{{ item.name }}
						</a>
					</li>
					<li></li>
	            </ul>
	        </div>

			<!-- 管理员可见 -->
			<aside v-if="userinfo && userinfo.userId == 1">
				<div class="grzx-left_title">
		            资源下载
		        </div>
				<div class="grzx-left_contenr">
		            <ul>
		                <li
							v-for="(item, index) in navList"
							:class="{act: index == dataIndex && navChose}"
							@click="changeDataIndex(index)">
							<a href="javascript:">
								<span></span>{{ item.name }}
							</a>
						</li>
						<li></li>
		            </ul>
		        </div>
			</aside>
	    </div>
	    <div class="grzx-right" v-if="rightData.dataList">
	        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="tab02">
	            <tbody>
	                <tr>
	                    <td colspan="4" class="ta">{{ navList[navIndex].name }}</td>
	                </tr>
	                <tr v-for="(item, index) in rightData.dataList">
	                    <td>{{ index + 1 + ((page-1) * count) }}</td>
	                    <td :class="{zi: !navChose, ri: navChose}">{{ item.data_resource_name }}</td>
						<td v-if="navChose">上传时间：{{ item.cdateStr }}</td>
	                    <td v-if="!navChose">下载：{{ item.down_count }}</td>
	                    <td>
							<a
								class="xzk"
								target="_blank"
								:href="downloadBaseUrl+item.url"
								:data-id="item.data_resource_id"
								v-if="userinfo && userinfo.userId == 1"
								@click="fnDownload"
								>
								下载
							</a>
						</td>
	                </tr>
	            </tbody>
	        </table>
	        <div class="xz fr">


				<!-- <Upload
					action="http://10.64.5.140:8080/WebSiteManager/kcata/tableType/save?token= 0e252096-6800-404c-a7b7-231eab420f71"
					:on-success="uploadSuccess">
					<Button type="primary" icon="ios-cloud-upload-outline">上传</Button>
				</Upload> -->
				<Upload
					:action="baseUrl+'/DataService/kway/data/uploadDuo?kvId='+kvId[navIndex]"
					:on-success="uploadSuccess">
					<Button type="primary" icon="ios-cloud-upload-outline">上传</Button>
				</Upload>
			</div>

	        <div class="page" style="padding:62px 0;">
				<p class="none" v-if="rightData.dataList.length <= 0">暂无信息</p>
				<Page :total="rightData.table_num"
				v-if="rightData.dataList.length > 0"
				show-sizer
				:page-size-opts="[5, 10, 20]"
				@on-page-size-change="changeSize"
				@on-change="changePage" />
	        </div>
	    </div>
	    <div class="clear"></div>
	</div>
</div>
</template>

<script src="./index.js"></script>

<style lang="scss" src="./index.css"></style>
