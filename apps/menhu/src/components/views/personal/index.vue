<template>
	<div class="background">
		<div class="grzx_box">
			<div class="grzx-left">
				<div class="grzx-left_title">
					个人中心
				</div>
				<div class="grzx-left_contenr">
					<ul>
						<li
							v-for="(item, index) in navList"
							:class="{active: index == navIndex}"
							@click="changeNavIndex(index)">
							<router-link :to="{ name: item.to }">
								<span></span>{{ item.name }}
							</router-link>
						</li>
					</ul>
				</div>
			</div>
			<router-view></router-view>
			<div class="clear"></div>
		</div>
	</div>
</template>

<script src="./index.js"></script>

<style lang="css" src="./index.css"></style>
