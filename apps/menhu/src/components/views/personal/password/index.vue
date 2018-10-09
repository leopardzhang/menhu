<template>
	<div class="grzx-right" style="height: 400px;">
		<div class="llb" style="margin-top: 50px;">
			<div class="zmm"><span class="rred">*</span>新密码</div>
			<div class="yiput"><input type="password" v-model="newPassword" placeholder="请输入新密码"></div>
			   <div class="clear"></div>
		</div>
		<div class="llb">
			<div class="zmm"><span class="rred">*</span>确定新密码</div>
			<div class="yiput"><input type="password" v-model="checkPassword" placeholder="请输入新密码"></div>
			   <div class="clear"></div>
		</div>
		<button class="qd" @click="handleSubmit">确定</button>
	</div>
</template>

<script src="./index.js"></script>

<style lang="css" src="./index.css"></style>
