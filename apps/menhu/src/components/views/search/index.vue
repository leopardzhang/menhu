<template>
<div class="background">
	<div class="liebiao_box">
	    <div class="t1_left">
	        <div class="san_box">
	            <div class="san_box_mc">最新数据</div>
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
	            <div class="san_box_mc">热门数据</div>
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
	            <div class="san_box_mc">推荐数据</div>
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

	        <div class="t1-sub-ss-titler" v-if="rightData">

	            共{{ rightData.total }}条搜索结果
	        </div>
			<!-- 右侧列表 -->
	        <div class="t1-sub-ss-sjzy" v-if="rightData">
	            <div class="t1-sub-sjzy-box" v-if="type == 0" v-for="(item, index) in rightData.rows">
	                <div class="sj">
						<input type="button" value="csv" class="sub-btn-csv">
						<input type="button" value="xls" class="sub-btn-xls">
						<input type="button" value="xml" class="sub-btn-xml">
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
						<Button
							type="warning"
							@click="handleClick(item.dy_id, false, index)"
							v-if="item.dyzt == 1">
							取消订阅
						</Button>
						<Button
							type="success"
							@click="handleClick(item.table_id, true, index)"
							v-if="item.dyzt != 1">
							订阅资源
						</Button>
						<Button type="primary" @click="handelApply(item.table_id, item.subject_base_name, item.org_id)">申请</Button>
	                </div>
	            </div>
				<!-- api -->
				<div class="t1-sub-box-lister" v-if="type == 1" v-for="(item, index) in rightData.rows">

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
				<!-- api -->
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
			<Table v-if="tabData.length" stripe :columns="column" :data="tabData"></Table>
		</Modal>
	</div>
</div>
</template>

<script src="./index.js"></script>

<style src="./index.css"></style>
