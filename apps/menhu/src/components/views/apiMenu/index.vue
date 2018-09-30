<template>
<div class="background">
	<div class="spin-container" v-if="loading">
		<Spin fix size="large"></Spin>
	</div>
    <div class="liebiao_box" v-if="!loading">
        <div class="t1-sub-paihang">
            <div class="ph_tiile">热门数据</div>
            <div class="ph_contenr">
                <ul class="fontt">
					<li
						v-for="(item, index) in hotDataList"
						:class="{one: index== 0, two: index == 1, three: index == 2}">
						{{ index + 1 }}
					</li>
                </ul>
                <ul class="ph_xinxi">
					<li v-for="item in hotDataList">{{ item.subject_base_name }}</li>
                </ul>
            </div>

        </div>
        <div class="t1-sub-right">
            <div class="t1-sub-fenlei">
                <ul>
                    <li>分类：</li>
					<li
						class="leibie"
						:class="{act: index == fl}"
						v-for="(item, index) in tabList"
						v-if="index != 2"
						@click="changeTab(index)"
					>
						{{ item.name }}
					</li>
                    <div class="clear"></div>
                    <div :class="{bumen_box: fl == 1, zhuti_box: fl == 0 }">
                        <ul>
							<li v-for="item in tableShowData">
								<a
									href="javascript:"
									:data-id="item.table_type_id"
									@click="changeFlClass">
									<img v-if="fl == 0" src="./images/pic.png" width="16" height="19"/>
									{{ item.name }}
								</a>
							</li>
                            <div class="clear"></div>
                        </ul>

                    </div>
                </ul>
            </div>
            <div class="t1-sub-titler">
                【共<span>{{ rightData.table_num }}</span>个API】
				<div class="xzz">
					<div
						:class="{activer: order == index, xzzz: order != index}"
						v-for="(item, index) in orderList"
						@click="changeOrder(index)">
						{{ item.name }}
					</div>
				</div>
            </div>

			<!-- loading -->
			<div class="t1-sub-box-lister" v-show="loadingRight">
				<Spin size="large"></Spin>
			</div>
			<!-- item -->
            <div class="t1-sub-box-lister" v-show="!loadingRight" v-for="(item, index) in rightData.table">

                <div class="name">
					<router-link :to="{ name: 'apiDetails', query: { tableId: item.table_id }}">
						{{ item.subject_base_name }}
					</router-link>
                </div>
                <div class="i"><img src="./images/i_11.png" /></div>
                <div style="float: left; width: 730px;">
                    <div class="gxsj">
                        <span class="zy">提供部门：</span>
                        <span class="qq">{{ item.dept_id_names }}</span>
                        <span class="zy">访问次数：</span>
                        <span class="qq">{{ item.visitnum_sum || 0 }}次</span>
                        <span class="zy">数据领域：</span>
                        <span class="qq">{{ item.table_type_snames }} </span>
                        <div class="clear"></div>
                    </div>
                    <div class="gxsj">
                        <span class="zy">资源摘要：</span>
                        <span class="qq">{{ item.table_remark }}</span>
                        <div class="clear"></div>
                    </div>
                    <div class="clear"></div>

                </div>
                <div class="clear"></div>

            </div>
			<!-- item -->

            <div class="page" style="box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);">
				<Page :total="parseInt(rightData.table_num)"
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
