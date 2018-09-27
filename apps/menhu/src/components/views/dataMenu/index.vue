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
										:data-id="item.table_type_id || item.table_type_branchid || item.table_type_sid"
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

					【共<span>{{ rightData.table_num }}</span>个信息资源】
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
							{{ item.subject_base_name }}
						</router-link> &nbsp;&nbsp;

					</div>
					<div class="gxsj" style="width: 100%;">
						更新时间：<span>{{ item.cdateDateStr }}</span> 查看：
						<span>{{ item.visitnum_sum }}人</span>下载：
						<span>{{ item.downnum_sum }}次</span> 数据领域：
						<span class="textoverflow">{{ item.sjly }} </span>
					</div>
					<div class="gxsj" style="width: 100%; max-width: 830px;">
						<div style="max-width: 780px;display:inline-block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
							资源摘要：<span>{{ item.table_remark }}</span></div>
					</div>
					<div class="anniu_box">
						<Button
							type="success"
							@click="handleClick(item.dy_id, false, index)"
							v-if="item.dyzt == 1">
							已订阅
						</Button>
						<Button
							type="primary"
							@click="handleClick(item.table_id, true, index)"
							v-if="item.dyzt != 1">
							订阅
						</Button>
						<Button type="primary" @click="handelApply(item.table_id, item.subject_base_name, item.org_id)">申请</Button>
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
			@on-ok="handleSubmit('formItem')">
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
		    </Form>
		</Modal>
	</div>
</template>

<script src="./index.js"></script>

<style lang="css" src="./index.css"></style>
