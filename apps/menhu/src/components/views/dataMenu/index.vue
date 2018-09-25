<template>
	<div class="background">
		<div class="spin-container" v-show="loading">
			<Spin fix size="large"></Spin>
		</div>
		<div class="liebiao_box" v-show="!loading">
			<div class="t1-sub-left">
				<ul class="tag2">
					<div class="tag2-zk"></div>
					<li :class="{selectTag: index == fl}" v-for="(item, index) in tabList">
						<a @click="changeTab(index)" href="javascript:">{{ item.name }}</a>
					</li>
				</ul>
				<div id="tagContent" class="tab-content">
					<div class="tagContent selectTag">
						<div class="t1-sub-box">
							<p>数据集</p>
							<ul id="listDomainList">
								<li v-for="item in tableShowData">
									<a
										href="javascript:"
										:data-id="item.table_type_id"
										@click="changeFlClass">
										<span>{{ item.table_count }}</span>{{ item.name }}
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="t1-sub-right">
				<div class="t1-sub-title">

					【共<span>{{ rightData.table_num }}</span>个采集数据】
					<div class="xzz">
						<div
							:class="{activer: order == index, xzzz: order != index}"
							v-for="(item, index) in orderList"
							@click="changeOrder(index)">
							{{ item.name }}
						</div>
					</div>
				</div>

				<!--loading-->
				<div class="t1-sub-right" v-show="loadingRight">
					<Spin size="large"></Spin>
				</div>

				<div class="t1-sub-box-list" v-show="!loadingRight" v-for="(item, index) in rightData.table">
					<div class="sj" v-if="item.data_type == 12">
							<input type="button" value="csv" class="sub-btn-csv">
							<input type="button" value="xls" class="sub-btn-xls">
							<input type="button" value="xml" class="sub-btn-xml">
					</div>
					<div class="name">
						<router-link :to="{ name: 'dataDetails', query: { table_id: item.table_id }}">
							{{ item.cusername }}
						</router-link> &nbsp;&nbsp;

					</div>
					<div class="gxsj" style="width: 100%;">
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
				<div class="page" style="padding:62px 0;">
					<Page :total="rightData.table_num"
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

<style lang="css" src="./index.css"></style>
