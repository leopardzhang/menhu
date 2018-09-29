<template>
<div class="root">
    <div class="classes">
        <div class="content clear">
            <div class="btn_box">
                <ul class="btn_list clear">
                    <li v-for="(item, index) in btnList" @click="changeIndex(index)">
                        <a href="javascript:" :class="{active: index == btnIndex}">{{ item.name }}</a>
                    </li>
                </ul>
            </div>
            <div class="item_box clear" v-show="btnIndex == 0">
                <ul class="item_list clear">
					<li v-for="(item, index) in indexData.findTableTypeAll" v-show="index < 10 || showAllImg">
						<router-link :to="{ name: 'dataMenu', query: {fl: 0, table_type_sid: item.table_type_id} }">
							<img :src="imgBaseUrl+'/upload'+item.imgurl" />
							<div class="hr"></div>
							<span>{{ item.name }}</span>
						</router-link>
                    </li>
                </ul>
                <div class="more">
                    <a href="javascript:" @click="showAllImgs">
						{{ showAllImg ? '收起 -': '更多 +' }}
					</a>
                </div>
            </div>
            <div class="item_box clear" v-show="btnIndex == 1">
                <ul class="text_list clear">
                    <li v-for="(item, index) in indexData.orgs" v-show="showAll || index<20">
						<router-link :to="{ name: 'dataMenu', query: {fl: 1, table_type_branchid: item.t_org_id} }">
							{{ item.name }}
						</router-link>
                    </li>
                </ul>
                <div class="more">
                    <a href="javascript:" @click="showAllOrgs">
						{{ showAll ? '收起 -': '更多 +' }}
					</a>
                </div>
            </div>
        </div>
    </div>
    <div class="data">
        <div class="title"></div>
        <div class="img_box">
            <div class="content">
                <div class="img_box">
                    <ul class="img_list clear">
                        <li>
                            <a href="javascript:">
								<img src="./images/data_07.jpg" />
							</a>
                        </li>
                        <li>
                            <a href="javascript:">
								<img src="./images/data_09.jpg" />
							</a>
                        </li>
                        <li>
                            <a href="javascript:">
								<img src="./images/data_11.jpg" />
							</a>
                        </li>
                    </ul>
                </div>
                <div class="news_box">
                    <ul class="news_list clear">
                        <li>
                            <ul class="news_item_list">
                                <li v-for="item in indexData.hotdata">
                                    <span>[{{ item.datanum_sum }}]</span>
									<router-link :to="{ name: 'dataDetails', query: { table_id: item.table_id }}">
										{{ item.subject_base_name }}
									</router-link>
                                </li>
                            </ul>
                            <a href="javascript:" class="more">
								更多
							</a>
                        </li>
                        <li>
                            <ul class="news_item_list">
                                <li v-for="item in indexData.recodata">
                                    <span>[{{ item.visitnum_sum }}]</span>
									<router-link :to="{ name: 'dataDetails', query: { table_id: item.table_id }}">
										{{ item.subject_base_name }}
									</router-link>
                                </li>
                            </ul>
                            <a href="javascript:" class="more">
								更多
							</a>
                        </li>
                        <li>
                            <ul class="news_item_list">
                                <li v-for="item in indexData.update_date">
                                    <span>[{{ item.datanum_sum }}]</span>
									<router-link :to="{ name: 'dataDetails', query: { table_id: item.table_id }}">
										{{ item.subject_base_name }}
									</router-link>
                                </li>
                            </ul>
                            <a href="javascript:" class="more">
								更多
							</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style src="./index.scss" lang="scss"></style>

<script src="./index.js"></script>
