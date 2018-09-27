<template>
<div class="background">
    <div class="contentr">
        <div class="detail-right">
            <div class="right-title">
                <div class="detail-header">
                    <span class="detail-title" v-if="!loading">{{ tableData.dataList.subject_base_name }}</span>
                    <div class="xzz">
                        <span class="dy"><Icon type="md-pricetag" size="16" />订阅</span>
                        <span class="sq"><Icon type="md-albums" size="16" />申请</span>
                    </div>
                </div>
                <div class="detail-simple-info">
                    <div class="sj1">
                        <input type="button" value="xml" class="sub-btn-xml">
                        <input type="button" value="xls" class="sub-btn-xls">
                        <input type="button" value="json" class="sub-btn-json">
                        <input type="button" value="csv" class="sub-btn-csv">
                    </div>
                    <div class="detail-count">
                        <span v-if="!loading">数据量：{{ tableData.dataList.datanum_sum }}</span>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
            <div class="m-tab">
                <div class="right-nav tab-header">
                    <ul>
                        <li
							:class="{ active: index == tabIndex}"
							@click="changeTab(index)"
							v-for="(item, index) in tab"
							class="data-info">
							{{ item.name }}
						</li>


                    </ul>
                </div>
                <div class="detail-info-list tab-body">
                    <ul>
                        <li action="data-info">
                            <!--  右侧基本信息开始 -->
							<div class="t1-sub-right" v-if="loading">
								<Spin size="large"></Spin>
							</div>
                            <div class="detail-base-list" v-if="!loading && tabIndex == 0">
                                <div style="font-size: 14px;font-weight: 600;line-height: 30px;color: #1b84a2;">
                                    <i class="iconfont"></i>基本信息
                                </div>
                                <div class="info-list">
                                    <ul>
                                        <li>
                                            <div class="info-header">数据目录名称</div>
                                            <div class="info-body">{{ tableData.dataList.subject_base_name }}</div>
                                        </li>
                                        <li>
                                            <div class="info-header">开放状态</div>
                                            <div class="info-body">{{ tableData.dataList.share_type_name }}</div>
                                        </li>
                                        <li>
                                            <div class="info-header">所属主题</div>
                                            <div class="info-body">{{ tableData.dataList.table_type_snames }}</div>
                                        </li>
                                        <li>
                                            <div class="info-header">最后更新</div>
                                            <div class="info-body">
                                                {{ tableData.dataList.updateDateStr}}
											</div>
                                        </li>
                                        <li style="width: 100%;">
                                            <div class="info-header">来源部门</div>
                                            <div class="info-body">{{ tableData.dataList.dept_id_names }}</div>
                                        </li>

                                        <li style="width: 100%;">
                                            <div class="info-header">标签</div>
                                            <div class="info-body" id="cata_tags" tags="兽医,诊疗许可">
												{{ tableData.dataList.tags_value != '' ? tableData.dataList.tags_value : '无' }}
											</div>
                                        </li>
                                        <li>
                                            <div class="info-header">更新频率</div>
                                            <div class="info-body">{{ tableData.dataList.cycle_type_name }}</div>
                                        </li>
                                        <li>
                                            <div class="info-header">数据格式</div>
                                            <div class="info-body">{{ tableData.dataList.data_type_name }}</div>
                                        </li>
                                        <li>
                                            <div class="info-header">发布时间</div>
                                            <div class="info-body">{{ tableData.dataList.cdateDateStr }}</div>
                                        </li>
                                        <li>
                                            <div class="info-header">所属行业</div>
                                            <div class="info-body">无</div><!-- 数据没有 -->
                                        </li>
                                    </ul>
                                </div>
                                <div style="font-size: 14px;font-weight: 600;line-height: 30px;color: #1b84a2;">
                                    <i class="iconfont"></i>内容简介
                                </div>
                                <div class="info-list">
                                    <ul>
                                        <li style="width: 100%;">
                                            <div class="info-header">简介</div>
                                            <div class="info-body">{{ tableData.dataList.table_remark }}</div>
                                        </li>
                                    </ul>
                                </div>
                                <div style="font-size: 14px;font-weight: 600;line-height: 30px; color: #1b84a2;">
                                    <i class="iconfont"></i>使用情况
                                </div>
                                <div class="info-list">
                                    <ul>
                                        <li>
                                            <div class="info-header">数据量</div>
                                            <div class="info-body">{{ tableData.dataList.datanum_sum }}</div>
                                        </li>
                                        <li>
                                            <div class="info-header">浏览量</div>
                                            <div class="info-body">{{ tableData.dataList.visitnum_sum }}</div>
                                        </li>
										<li style="width: 100%;">
                                            <div class="info-header">下载量</div>
                                            <div class="info-body">{{ tableData.dataList.downnum_sum }}</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
							<div class="detail-base-list" v-if="!loading && tabIndex == 1">
								<div style="font-size: 14px;font-weight: 600;line-height: 30px;color: #1b84a2;">
                                    <i class="iconfont"></i>信息项
                                </div>
								<div class="info-list">
                                    <Table border stripe :columns="columns" :data="tableData.cols"></Table>
								</div>
							</div>
                            <!--  右侧基本信息结束 -->
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script src="./index.js"></script>

<style lang="css" src="./index.css"></style>
