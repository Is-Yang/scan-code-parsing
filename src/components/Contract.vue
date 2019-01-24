<template>
    <div class="contract-wrapper">
        <div class="contract-logo">
            <img src="../assets/love_logo.png" alt="恋爱合约" />
        </div>
        <table class="table-content">
            <colgroup>
                <col style="width: 30%" />
                <col style="width: 70%" />
            </colgroup>
            <thead>
                <tr>
                    <td colspan="2">
                        <p class="cell">
                            鉴于签约人已于本公司签订恋爱合约，并按合约约定向本公司支付合约费，本公司同意按照合约条款的约定承担
                            签约责任，特立本合约单为凭。合约条款，兑现申请书及合约单是本合约不可分割的组成部分。
                        </p>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in tableDetail" :key="index">
                    <td>{{item.title}}</td>
                    <td v-if="item.data != ''">
                    <p class="cell">{{tableData[item.data]}}</p>
                    </td>
                    <td v-if="item.value">
                        <p v-for="(val, i) in item.value" :key="i" class="cell">
                            {{val}}
                        </p>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="2">
                        <div class="user-info">
                            <div>
                                <span>生效日期：{{dateTime}}</span>
                                <span>签约人姓名：</span>
                            </div>
                            <div>
                                <span>东莞中融股权投资有限公司</span>
                                <span>日期：{{signDate}}</span>
                            </div>
                            <div>
                                <span>恋爱合约官网www.liwuhy.com</span>
                            </div>

                            <img class="seal" src="../assets/seal.png" alt="盖章" />
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            dateTime: '',
            signDate: '',
            tableDetail: [
                {
                    title: '合约单号',
                    data: 'OrderNo'
                },{
                    title: '签约人姓名',
                    data: 'RealityName'
                },{
                    title: '心上人姓名',
                    data: 'CompanyName'
                },{
                    title: '合约期间',
                    data: '',
                    value: ['合约生效之日起三年以后十年以内']
                },{
                    title: '结婚祝福',
                    data: 'ProductName'
                },{
                    title: '签约人身份证',
                    data: 'IDCardNumber'
                }, {
                    title: '签约提示',
                    data: '',
                    value: ['1、恋爱合约由中融股权投资有限公司发行，面向全国销售(港澳台除外）。',
                            '2、本产品签约人年龄应为14-100周岁（含14、100周岁）且拥有中华人民共和国国籍。',
                            '3、恋爱合约购买成功后，次日零时起生效。除另有约定外，合约期间为合约生效之日起三年以后十年以内，并载明于合约单上。签约人满足兑现申请要求后，在合约期间内可以随时向我公司提出兑现申请。签约人与其心上人均为首次在民政部门领取结婚证且领取结婚证时间在合约期间内才能获得兑现。',
                            '4、签约人在购买恋爱合约时须提供本人及指定心上人真实有效的个人信息，心上人不需要填写身份证号。心上人姓名由签约人在签订恋爱合约时指定，并在合约单中载明。心上人一经指定，在合约存续期间不得变更。',
                            '5、四个版本可同时购买，但一对情侣每个版本限购一份，相同版本重复购买只能兑现一次。',
                            `6、本产品高级中等教育在校学生及在校大学生指：中华人民共和国教育部认定的高级中 学的中学生及全日制普通高校的专科生、本科生、研究生、博士生，非全日制的在职本 科生、在职研究生及在职博士生不在此列。
                              现役军人是指正在中国人民解放军和中国人 民武装警察部队服现役、具有现役军籍，尚未退伍、转业、复员的军人。购买时无需验 证身份，您只需根据您的真实情况选择对应版本购买即可。
                              但在校学生版和现役军人版 在申请兑现时，签约人需要提供相关学生证件（毕业证、结业证、肄业证或学信网证明 均可）或军人证件，证明您购买时为在校学生或现役军人，否则不予兑现。`,
                            '7、恋爱合约价格分为399元与520元两种，399元价格仅限在校学生及现役军人购买，在校学生版与现役军人版仅要求签约人购买时为在校学生或现役军人，对心上人不作要求 签约人一次性支付合约费即可，不需要每年续费且兑现时无需支付其他费用。',
                            '8、本产品只适用合约条款中之实物兑现形式，我公司核对之后，将根据恋爱合约条款给付实物。',
                            '9、恋爱合约为定制产品，一经售出，概不退换且不办理任何形式的变更。',
                            '10、收到纸质合约单后请签约人签字并拍照或扫描发至公司邮箱liwuhy@163.com备案。',
                            '11、恋爱合约相关条款请在恋爱合约官网www.liwuhy.com自行下载。']
                }
            ]
        }
    },
    created () {
        this.$vux.loading.show();
        if (this.$route.query) {
            this.order_no = this.$route.query.order_no;
            this.rhino_sign = this.$route.query.rhino_sign;

            let url = 'http://lx.hzyctools.com';
            this.$http.get(url + '/api/index/cert_of_love/order_no/' + this.order_no + '&rhino_sign=' + this.rhino_sign).then(({data}) => {
                this.$vux.loading.hide();
                if (data.code !== 1) {
                    this.$vux.toast.text(data.msg);
                    return;
                }
                if (data && data.data) {
                    this.tableData = data.data;
                    this.dateTime = data.data.DateTime;
                    this.signDate = data.data.SignDate;
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .contract-wrapper {
        background-color: #fff;
        padding: .25rem;
        font-size: .26rem;
        
        .contract-logo {
            width: 40%;
			height: 2rem;
            margin: .25rem auto;
            text-align: center;
            img {
                max-width: 100%;
                max-height: 100%;
            }
        }

        .table-content {
            border: 1px solid #999;
            border-collapse: collapse;
            border-spacing: 0;
            display: table;
            td {
                padding: .1rem .15rem;
                border-bottom: 1px solid #999;
                border-right: 1px solid #999;

                .cell {
                    margin: .1rem 0;
                }
            }
        }
        
        .user-info {
            position: relative;
            &>div{
				display: flex;
				margin: 5px 0;
				>span:first-child {
                    width: 60%;
                    padding-right: .1rem;
				}
            }
            .seal {
                position: absolute;
                width: 1.6rem;
                bottom: -0.1rem;
                left: 30%;
                opacity: .58;
            }
        }
        
    }
</style>


