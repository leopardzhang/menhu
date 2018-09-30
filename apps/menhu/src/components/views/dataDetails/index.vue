<template>
<div class="background">
    <div class="contentr">
        <div class="detail-right">
            <div class="right-title">
                <div class="detail-header" v-if="!loading">
                    <span class="detail-title">{{ tableData.dataList.subject_base_name }}</span>
                    <div class="xzz">
                        <span class="sq" @click="handleClick">
							<Icon type="md-pricetag" size="16" />
							{{ tableData.dataList.dyzt == 1 ? '取消订阅' : '订阅'}}
						</span>
                        <span
							class="sq"
							@click="handelApply(tableData.dataList.table_id, tableData.dataList.subject_base_name, tableData.dataList.org_id)"><Icon type="md-albums" size="16" />申请</span>
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
							class="data-info"
							v-if="downloadAble || index != 3">
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
							<div class="detail-base-list" v-if="!loading && tabIndex == 2">
								<div style="font-size: 14px;font-weight: 600;line-height: 30px;color: #1b84a2;">
                                    <i class="iconfont"></i>资源数据查询
                                </div>
								<div class="info-list">
                                    <Table
										v-if="dataTable.rows"
										border
										stripe
										:columns="dataColumns"
										:data="dataTable.rows">
									</Table>
								</div>
							</div>
							<div class="detail-base-list" v-if="!loading && tabIndex == 3">
								<ButtonGroup size="large">
									<Button
										v-for="item in btnType"
										size="large"
										:type="item.type"
										@click="checkDownload(item.str)">
										{{ item.name }}
									</Button>
								</ButtonGroup>
								<div style="padding-top: 25px;">
									<Table
										v-if="pageTable"
										border
										stripe
										:columns="pagetab"
										:data="pageTable">
									</Table>
								</div>
							</div>
                            <!--  右侧基本信息结束 -->

							<div class="page" style="padding:62px 0;" v-if="!loading && tabIndex == 2">
								<Page :total="dataTable.total"
								show-sizer
								:page-size-opts="[5, 10, 20]"
								@on-page-size-change="changeSize"
								@on-change="changePage" />
							</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
	<Modal
		v-model="showModel"
		ref="model"
		width="700"
		:closable="false"
		:mask-closable="false"
		:loading="true"
		class-name="vertical-center-modal"
		title="申请"
		ok-text="提交"
		cancel-text="取消"
		@on-ok="handleSubmit('formItem', 2)">
		<Form
			ref="formItem"
			:model="formItem"
			:rules="ruleValidate"
			:label-width="80">
			<Row>
				<Col span="12">
					<FormItem label="开始时间" prop="request_sdate">
						<DatePicker
							type="date"
							placeholder="选择开始时间"
							style="width:254px"
							v-model="formItem.request_sdate">
						</DatePicker>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="结束时间" prop="request_edate">
						<DatePicker
							type="date"
							placeholder="选择结束时间"
							style="width:254px"
							v-model="formItem.request_edate">
						</DatePicker>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
					<FormItem label="联系人" prop="contacts_name">
						<Input
							v-model="formItem.contacts_name"
							placeholder="输入联系人姓名"></Input>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="联系电话" prop="contacts_tel">
						<Input
						v-model="formItem.contacts_tel"
						placeholder="输入联系电话"></Input>
					</FormItem>
				</Col>
			</Row>
			<FormItem label="上传附件">
				<Input v-model="formItem.file_path" style="width: 250px" disabled placeholder="文件路径" />
				<div class="upload_box">
					<Upload
						ref="uploadFiles"
						action="http://10.64.5.140:8888/DataService/kway/data/Applyupload"
						:on-success="fnUploadSuccess">
						<Button type="primary">上传附件</Button>
					</Upload>
				</div>
			</FormItem>
			<FormItem label="交换方式" prop="exchange_type">
				<RadioGroup v-model="formItem.exchange_type">
					<Radio :label="item.id" v-for="item in exchangeList">{{ item.remarks }}</Radio>
				</RadioGroup>
			</FormItem>
			<FormItem label="申请用途" prop="request_purpose">
				<Input v-model="formItem.request_purpose" type="textarea" :autosize="{minRows: 3}"></Input>
			</FormItem>
			<FormItem>
				<Button type="info" @click="handleSubmit('formItem', 1)">保存到草稿</Button>
			</FormItem>
		</Form>
	</Modal>
</div>
</template>

<script src="./index.js"></script>

<style lang="css" src="./index.css"></style>
