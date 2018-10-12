<template>
<div class="grzx_box">
	<div class="grzx-right" style="padding: 15px;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="tab02">
            <tbody>
                <tr class="hh">
                    <td>目录名称</td>
                    <td>目录所属部门</td>
                    <td>申请人</td>
                    <td>申请人联系电话</td>
                    <td>状态</td>
                    <td>有效期开始</td>
                    <td>有效期结束</td>
                    <td>交换方式</td>
                    <td>操作</td>
                </tr>
				<tr v-for="(item, index) in rightData.rows">
					<td>{{ item.table_name }}</td>
					<td>{{ item.table_orgname }}</td>
					<td>{{ item.contacts_name }}</td>
					<td>{{ item.contacts_tel }}</td>
					<td>{{ formatData(item.sts) }}</td>
					<td>{{ item.request_sdateStr }}</td>
					<td>{{ item.request_edateStr }}</td>
					<td>{{ item.kv_name }}</td>
					<td><a class="cz" href="javascript:" @click="handleCheck(item.table_id, item.data_request_id)">[查看]</a></td>
				</tr>
            </tbody>
        </table>
		<div class="page">
			<Page :total="parseInt(rightData.total)"
			show-sizer
			:page-size-opts="[5, 10, 20]"
			@on-page-size-change="changeSize"
			@on-change="changePage" />
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
		:ok-text="formItem.cuserid == userinfo.userId ? '提交' : '确认'"
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
							:disabled="formItem.cuserid != userinfo.userId"
							type="date"
							placeholder="选择开始时间"
							style="width:254px"
							v-model="formItem.request_sdateStr">
						</DatePicker>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="结束时间" prop="request_edate">
						<DatePicker
							:disabled="formItem.cuserid != userinfo.userId"
							type="date"
							placeholder="选择结束时间"
							style="width:254px"
							v-model="formItem.request_edateStr">
						</DatePicker>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
					<FormItem label="联系人" prop="contacts_name">
						<Input
							:disabled="formItem.cuserid != userinfo.userId"
							v-model="formItem.contacts_name"
							placeholder="输入联系人姓名"></Input>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="联系电话" prop="contacts_tel">
						<Input
							:disabled="formItem.cuserid != userinfo.userId"
							v-model="formItem.contacts_tel"
							placeholder="输入联系电话"></Input>
					</FormItem>
				</Col>
			</Row>
			<FormItem label="上传附件">
				<Input
					v-model="formItem.file_path"
					style="width: 250px"
					disabled
					placeholder="文件路径" />
				<div class="upload_box">
					<Upload
						v-if="formItem.cuserid == userinfo.userId"
						ref="uploadFiles"
						action="http://10.64.5.140:8888/DataService/kway/data/Applyupload"
						:on-success="fnUploadSuccess">
						<Button type="primary">上传附件</Button>
					</Upload>
				</div>
			</FormItem>
			<FormItem label="交换方式" prop="exchange_type">
				<RadioGroup v-model="formItem.exchange_type" v-if="formItem.cuserid == userinfo.userId">
					<Radio :label="item.id" v-for="item in exchangeList">{{ item.remarks }}</Radio>
				</RadioGroup>
				<p v-if="formItem.cuserid != userinfo.userId">{{ formItem.kv_name }}</p>
			</FormItem>
			<FormItem label="申请用途" prop="request_purpose">
				<Input
					:disabled="formItem.cuserid != userinfo.userId"
					v-model="formItem.request_purpose"
					type="textarea"
					:autosize="{minRows: 3}">
				</Input>
			</FormItem>
			<FormItem>
				<Button v-if="formItem.cuserid == userinfo.userId" type="info" @click="handleSubmit('formItem', 1)">保存到草稿</Button>
			</FormItem>
		</Form>
		<Table v-if="tabData.length" stripe :columns="column" :data="tabData"></Table>
	</Modal>
</div>
</template>

<script src="./index.js"></script>

<style lang="css" src="./index.css"></style>
