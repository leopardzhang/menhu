<template>
	<div class="grzx-right">
		<div class="grzx-title">

			【共<span>{{ rightData.table_num }}</span>个采集数据】

		</div>
		<div class="grzx-box-list" v-for="(item, index) in rightData.table">

			<div class="name">
				<router-link :to="{ name: 'dataDetails', query: { table_id: item.table_id }}">
					{{ item.subject_base_name }}
				</router-link> &nbsp;&nbsp;
			</div>
			<div class="gxsj" style="width: 100%;">
				更新时间：<span>{{ item.updateDateStr }}</span> 上次预览时间：
				<span>{{ item.last_date_time }}</span>更新条数：
				<span>{{ item.ts_num }}条</span>
			</div>
			<div class="gxsj" style="width: 100%; max-width: 830px;">
				数据领域：
				<span>{{ item.sjly }} </span>
			</div>
			<div class="anniu_box">
				<button @click="handleCancel(item.metadata_subscription_id, index)">取消订阅</button>
			</div>
		</div>
		<div class="page" style="padding:62px 0;">
			<Page :total="parseInt(rightData.table_num)"
			show-sizer
			:page-size-opts="[5, 10, 20]"
			@on-page-size-change="changeSize"
			@on-change="changePage" />
		</div>
	</div>
</template>

<script src="./index.js"></script>

<style lang="css" src="./index.css"></style>
