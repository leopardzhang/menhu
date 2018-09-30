<template>
<div class="background" v-if="rightData">
    <div class="liebiao_box">
        <div class="t1-sub-paihang">
            <div class="ph_tiile">数据下载排行</div>
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

            <div class="t1-sub-box-nr">

                <div class="name">
                    <a>{{ rightData.subject_base_name }}</a>
                </div>

                <div style="width: 730px; margin-left: 27px;">
                    <div class="gxsj">
                        <span class="zy">提供部门：</span>
                        <span class="qq">发展和改革委员会</span>
                        <span class="zy">调用次数：</span>
                        <span class="qq">0次</span>
                        <span class="zy">数据领域：</span>
                        <span class="qq">安全生产 </span>
                        <div class="clear"></div>
                    </div>
                </div>
                <div class="clear"></div>

            </div>
            <!--表格-->
            <div class="t1-sub-box-bg">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="tab02">
                    <tbody>
                        <tr>
                            <td colspan="4" class="ta">功能说明</td>
                        </tr>
                        <tr>
                            <td colspan="4">{{ rightData.table_remark }}</td>
                        </tr>
                        <tr>
                            <td colspan="4" class="ta">调用说明</td>
                        </tr>
                        <tr>
                            <td colspan="2">调用方式：</td>
                            <td colspan="2">请求地址：</td>

                        </tr>
                        <tr>
                            <td colspan="2">restful</td>
                            <td colspan="2">/DataService/kChange/apiOperation/resourceDataQuery</td>

                        </tr>
                    </tbody>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="tab02">
                    <tbody>
                        <tr>
                            <td colspan="4" style="background:#fff8ee;" class="ta">请求参数</td>
                        </tr>
                        <tr>
                            <td colspan="4">所有参数都需进行URL编码，编码时请遵守 RFC 1738。</td>
                        </tr>
                        <tr>
                            <td colspan="4" class="ta">通用参数</td>
                        </tr>
                        <tr>
                            <td>参数名称</td>
                            <td width="100">是否必须</td>
                            <td width="100">类型</td>
                            <td>描述</td>
                        </tr>
                        <tr>
                            <td>token</td>
                            <td>必填</td>
                            <td>字符</td>
                            <td>是授权秘钥，用于使用权限调用说明</td>
                        </tr>
                        <tr>
                            <td>page</td>
                            <td>必填</td>
                            <td>字符</td>
                            <td>查询页号</td>
                        </tr>
                        <tr>
                            <td>tableCode</td>
                            <td>必填</td>
                            <td>字符</td>
                            <td>资源编码</td>
                        </tr>
                        <tr>
                            <td>pageSize</td>
                            <td>非必填</td>
                            <td>字符</td>
                            <td>每页数量，上限5000</td>
                        </tr>
                        <tr>
                            <td>columns</td>
                            <td>非必填</td>
                            <td>字符</td>
                            <td>代表可查看字段名称</td>
                        </tr>
                        <tr>
                            <td>paramBeanList</td>
                            <td>非必填</td>
                            <td>字符</td>
                            <td>查询条件列表</td>
                        </tr>
                        <tr>
                            <td>fieldName</td>
                            <td>非必填</td>
                            <td>字符</td>
                            <td>字段名称(如果paramBeanList填写则该字段必填)</td>
                        </tr>
                        <tr>
                            <td>expression</td>
                            <td>非必填</td>
                            <td>字符</td>
                            <td>表达式 该表达式支持in、=、&gt;、&lt;、&lt;=、&gt;=、like
                                表达式(如果paramBeanList填写则该字段必填)</td>
                        </tr>
                        <tr>
                            <td>values</td>
                            <td>非必填</td>
                            <td>字符</td>
                            <td>具体值列表，in条件支持数组，其余的数组长度只能为1(如果paramBeanList填写则该字段必填)</td>
                        </tr>
                        <tr>
                            <td>linkSymbol</td>
                            <td>非必填</td>
                            <td>字符</td>
                            <td>链接符，（AND,OR）默认可不填，不填则为AND</td>
                        </tr>
                        <tr>
                            <td colspan="4" class="ta">私有参数</td>
                        </tr>
                        <tr>
                            <td>参数名称</td>
                            <td>是否必须</td>
                            <td>类型</td>
                            <td>描述</td>
                        </tr>

                        <tr>
                            <td colspan="4">无私有参数</td>

                        </tr>
                    </tbody>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="tab02">
                    <tbody>
                        <tr>
                            <td colspan="4" class="ta" style="background:#fff8ee;">返回参数</td>
                        </tr>

                        <tr>
                            <td colspan="4" class="ta">通用参数</td>
                        </tr>
                        <tr>
                            <td colspan="2">返回参数名称</td>
                            <td colspan="2">描述</td>

                        </tr>
                        <tr>
                            <td colspan="2">rows</td>
                            <td colspan="2">查询结果集合</td>
                        </tr>
                        <tr>
                            <td colspan="2">批次号</td>
                            <td colspan="2">当前进入系统的批次号</td>
                        </tr>
                        <tr>
                            <td colspan="2">count</td>
                            <td colspan="2">总数量</td>
                        </tr>
                        <tr>
                            <td colspan="2">errorCode</td>
                            <td colspan="2">错误编码</td>
                        </tr>
                        <tr>
                            <td colspan="2">md5Key</td>
                            <td colspan="2">用户使用md5码</td>
                        </tr>
                        <tr>
                            <td colspan="2">opensSts</td>
                            <td colspan="2">是否开放属性</td>
                        </tr>
                        <tr>
                            <td colspan="2">orgId</td>
                            <td colspan="2">当前部门授权id</td>
                        </tr>
                        <tr>
                            <td colspan="2">page</td>
                            <td colspan="2">当前页码</td>
                        </tr>
                        <tr>
                            <td colspan="2">pageSize</td>
                            <td colspan="2">每页显示多少行</td>
                        </tr>
                        <tr>
                            <td colspan="2">paramBeanList</td>
                            <td colspan="2">查询条件列表</td>
                        </tr>
                        <tr>
                            <td colspan="2">resourceName</td>
                            <td colspan="2">资源目录名称</td>
                        </tr>
                        <tr>
                            <td colspan="2">tableCode</td>
                            <td colspan="2">资源目录编码（信息资源代码）</td>
                        </tr>
                        <tr>
                            <td colspan="2">token</td>
                            <td colspan="2">当前授权码</td>
                        </tr>
                        <tr>
                            <td colspan="2">totalPager</td>
                            <td colspan="2">总页数</td>
                        </tr>
                        <tr>
                            <td colspan="2">userName</td>
                            <td colspan="2">用户名称</td>
                        </tr>
                        <tr>
                            <td colspan="4" class="ta">私有参数</td>
                        </tr>
                        <tr>
                            <td colspan="2">返回参数名称</td>
                            <td colspan="2">描述</td>

                        </tr>

                        <tr v-for="item in rightData.data[0].metadataCols">
                            <td colspan="2">{{ item.col_chinese }}</td>
                            <td colspan="2">信息项中文名称，长度{{ item.col_length }}</td>
                        </tr>
                    </tbody>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="tab02">
                    <tbody>
                        <tr>
                            <td colspan="4" class="ta">错误编码</td>
                        </tr>
                        <tr>
                            <td colspan="2">errorCode</td>
                            <td colspan="2">errorMessage</td>

                        </tr>

                        <tr>
                            <td colspan="2">0</td>
                            <td colspan="2">成功（空的）</td>
                        </tr>
                        <tr>
                            <td colspan="2">100</td>
                            <td colspan="2">对不起您的授权值为空，不可操作增加资源库信息</td>
                        </tr>

                        <tr>
                            <td colspan="2">101</td>
                            <td colspan="2">您的授权密文不正确或已过期，请重新申请授权</td>
                        </tr>
                        <tr>
                            <td colspan="2">103</td>
                            <td colspan="2">您的查询条件字段不存在，请填写查询条件后方能查询</td>
                        </tr>
                        <tr>
                            <td colspan="2">110</td>
                            <td colspan="2">您的插入记录条数为空，无法继续进行插入操作</td>
                        </tr>
                        <tr>
                            <td colspan="2">111</td>
                            <td colspan="2">您的插入记录条数大于系统可接受的最大长度,最大长度</td>
                        </tr>
                        <tr>
                            <td colspan="2">201</td>
                            <td colspan="2">您的操作请求与对应API请求是插入接口，操作请求应标识为插入方可进程操作</td>
                        </tr>
                        <tr>
                            <td colspan="2">202</td>
                            <td colspan="2">您指定的资源编码不存在，无法进行插入操作</td>
                        </tr>
                        <tr>
                            <td colspan="2">301</td>
                            <td colspan="2">删除失败，您的资源无法进行删除请查证后再行删除</td>
                        </tr>
                        <tr>
                            <td colspan="2">302</td>
                            <td colspan="2">您的批次号与资源目录不匹配，无法进行删除</td>
                        </tr>
                        <tr>
                            <td colspan="2">305</td>
                            <td colspan="2">您的批次号不存在，或有问题，无法进行删除</td>
                        </tr>
                        <tr>
                            <td colspan="2">501</td>
                            <td colspan="2">您的表达式有问题，请验证表达式后方可继续查询</td>
                        </tr>
                        <tr>
                            <td colspan="2">502</td>
                            <td colspan="2">您的表达式有问题，请勿使用空条件查询</td>
                        </tr>
                        <tr>
                            <td colspan="2">503</td>
                            <td colspan="2">您的表达式有问题，请勿使用非等于以外的条件查询</td>
                        </tr>
                        <tr>
                            <td colspan="2">1001</td>
                            <td colspan="2">您的操作权限已经过期或无操作权限，请重新申请操作权限</td>
                        </tr>
                        <tr>
                            <td colspan="2">1002</td>
                            <td colspan="2">您的查询无法进行无条件查询，请填写查询条件后方能查询</td>
                        </tr>
                        <tr>
                            <td colspan="2">1003</td>
                            <td colspan="2">您的查询条件参数不正确，请核对参数条件</td>
                        </tr>
                        <tr>
                            <td colspan="2">1004</td>
                            <td colspan="2">您的查询条件参数不正确，请核对参数条件的值</td>
                        </tr>
                        <tr>
                            <td colspan="2">1006</td>
                            <td colspan="2">您的查询条件字段非唯一性字段无法进行查询操作，请选择唯一性字段进行查询</td>
                        </tr>
                        <tr>
                            <td colspan="2">1501</td>
                            <td colspan="2">您的选择字段有问题或者不存在，请核对选择字段</td>
                        </tr>
                        <tr>
                            <td colspan="2">1502</td>
                            <td colspan="2">您的选择查询条件字段有问题或者不存在，请核对选择字段</td>
                        </tr>


                    </tbody>
                </table>
            </div>
        </div>
        <div class="clear"></div>
    </div>
</div>
</template>

<script src="./index.js"></script>

<style lang="css" src="./index.css"></style>
