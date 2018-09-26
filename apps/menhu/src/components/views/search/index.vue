<template>
<div class="liebiao_box">
    <div class="t1_left">
        <div class="san_box">
            <div class="san_box_mc">最新数据<span class="gd">+&nbsp;more</span></div>
            <ul>
                <li v-for="(item, index) in indexData.hotdata">
					<router-link :to="{ name: 'dataDetails', query: { table_id: item.table_id }}">
						<span class="h"></span>
						<span class="xinxi">{{ item.subject_base_name }}</span>
						<span class="z">[{{ item.datanum_sum }}]</span>
					</router-link>
                </li>
            </ul>
        </div>
        <div class="san_box">
            <div class="san_box_mc">热门数据<span class="gd">+&nbsp;more</span></div>
            <ul>
				<li v-for="(item, index) in indexData.recodata">
					<router-link :to="{ name: 'dataDetails', query: { table_id: item.table_id }}">
						<span class="h"></span>
						<span class="xinxi">{{ item.subject_base_name }}</span>
						<span class="z">[{{ item.datanum_sum }}]</span>
					</router-link>
                </li>
            </ul>
        </div>
        <div class="san_box">
            <div class="san_box_mc">推荐数据<span class="gd">+&nbsp;more</span></div>
            <ul>
				<li v-for="(item, index) in indexData.update_date">
					<router-link :to="{ name: 'dataDetails', query: { table_id: item.table_id }}">
						<span class="h"></span>
						<span class="xinxi">{{ item.subject_base_name }}</span>
						<span class="z">[{{ item.datanum_sum }}]</span>
					</router-link>
                </li>
            </ul>
        </div>
    </div>
    <div class="t1-sub-right">

        <div class="t1-sub-ss-titler">

            &nbsp;搜索结果：&nbsp;&nbsp; <span>数据资源</span>&nbsp;&nbsp;&nbsp;&nbsp;API服务

        </div>
        <div class="t1-sub-ss-sjzy" v-if="rightData">
            <div class="t1-sub-sjzy-box" v-for="(item, index) in rightData.rows">
                <div class="sj">
                    <input type="button" value="csv" class="sub-btn-csv">
                    <input type="button" value="xls" class="sub-btn-xls">
                </div>
                <div class="name">
					<router-link :to="{ name: 'dataDetails', query: { table_id: item.table_id }}">
						{{ item.subject_base_name }}
					</router-link> &nbsp;&nbsp;

                </div>
                <div class="gxsj">
					更新时间：<span>{{ item.cdateDateStr }}</span> 查看：
					<span>{{ item.visitnum_sum }}人</span>下载：
					<span>{{ item.downnum_sum }}次</span> 数据领域：
					<span>{{ item.sjly }} </span>
                </div>
				<div class="gxsj" style="width: 100%; max-width: 830px;">
					<div style="max-width: 780px;display:inline-block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
						资源摘要：<span>{{ item.table_remark }}</span></div>
				</div>
                <div class="anniu_box">
                    <button>订阅</button>
                    <button>申请</button>
                </div>
            </div>
        </div>
        <div v-if="rightData" class="page" style="box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);">
			<Page :total="parseInt(rightData.total)"
			show-sizer
			:page-size-opts="[5, 10, 20]"
			@on-page-size-change="changeSize"
			@on-change="changePage" />
        </div>
    </div>
    <div class="clear"></div>
</div>
</template>

<script src="./index.js"></script>

<style src="./index.css"></style>
