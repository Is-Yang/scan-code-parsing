<template>
    <div class="contract-wrapper">
        <div class="contract-logo">
            <img src="../assets/love_logo.png" alt="恋爱合约" />
        </div>
        <table class="table-content">
            <colgroup>
                <col style="width: 2.1rem" />
            </colgroup>
            <thead>
                <tr>
                    <td colspan="2">
                        <p class="cell">
                            鉴于签约人已与本公司签订恋爱合约，并按合约约定向本公司支付合约费，本公司同意按照合约条款的约定承担签约责任，特立本合约单为凭。
                            合约条款、兑现申请书及合约单是本合约不可分割的组成部分。
                        </p>
                    </td>
                </tr>
            </thead>
            <!-- pc端 -->
            <tbody v-if="!sysMobile">
                <tr v-for="(item, index) in tableDetail" :key="index">
                    <td>
                    	<span :class="item.title == '签约提示' ? 'newline' : ''">{{item.title}}</span>
                    </td>
                    <td v-if="item.data != '' && item.title != '签约提示'">
                    	<p class="cell">{{tableData[item.data]}}</p>
                    </td>
                    <td v-if="item.data != '' && item.title == '签约提示'" :class="tableData.statu == 9 ? 'wuxiao' : 'chaxu'">
                    	<p v-for="(val, i) in tableData[item.data]" :key="i" class="cell">
                            {{val}}
                        </p>
                    </td>
                    <td v-if="item.title == '合约期间'">
                        <p class="cell">
                            {{item.value}}
                        </p>
                    </td>
                </tr>
            </tbody>
            <!-- 手机端 -->
            <tbody v-if="sysMobile">
                <tr v-for="(item, index) in tableDetail" :key="index">
                    <td :colspan="item.title == '签约提示' ? '2' : '1'"
                        :class="[{'notify': item.title == '签约提示', 'wuxiao': tableData.statu == 9, 'chaxu': tableData.statu != 9}]">
                    	<span v-if="item.title != '签约提示'">{{item.title}}</span>

                        <div v-if="item.title == '签约提示'" class="tit">明示告知</div>
                        <div v-if="item.data != '' && item.title == '签约提示'" class="info">
                            <p v-for="(val, i) in tableData[item.data]" :key="i" class="cell">
                                {{val}}
                            </p>
                        </div>
                    </td>
                    <td v-if="item.data != '' && item.title != '签约提示'">
                    	<p class="cell">{{tableData[item.data]}}</p>
                    </td>
                    <td v-if="item.title == '合约期间'">
                        <p class="cell">
                            {{item.value}}
                        </p>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="2">
                        <div class="user-info">
                            <div>
                                <p>生效日期：{{signDate}}</p>
                                <p>广东中融股权投资有限公司<p>
                                <p>恋爱合约官网www.liwuhy.com</p>

                            </div>
                            <div v-if="!sysMobile">
                                <p>签字：</p>
                                <p>日期：</p>
                            </div>
                            <img class="seal" :class="{'mobile' : sysMobile}" src="../assets/seal.png" alt="盖章" />
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
            realityName: '',
            signDate: '',  // 生效时间日期
            sysMobile: false,
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
                    value: '合约生效之日起三年以后十年以内'
                },{
                    title: '结婚祝福',
                    data: 'WeddingWish'
                },{
                    title: '签约人身份证',
                    data: 'IDCardNumber'
                }, {
                    title: '签约提示',
                    data: 'contract_detail'
                }
            ]
        }
    },
    mounted() {
        // 判断是否为手机设备
        this.sysMobile = /Android|webOS|iPhone|iPod|BlackBerry|Symbian/i.test(navigator.userAgent);
    },
    created () {
        this.$vux.loading.show();
        if (this.$route.query) {
            let order_no = this.$route.query && this.$route.query.order_no;
            let rhino_sign = this.$route.query && this.$route.query.rhino_sign;

            let url = 'http://love.hzyctools.com';
            this.$http.get('/love_contract?order_no=' + order_no + '&rhino_sign=' + rhino_sign + '&order_id=' + order_no).then(({data}) => {
                this.$vux.loading.hide();
                if (data.code !== 1) {
                    this.$vux.toast.text(data.msg);
                    return;
                }
                if (data && data.data) {
                    let result = data.data;
                    this.tableData = result;
                    this.signDate = result.SignDate;
                    this.realityName = result.RealityName;
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .contract-wrapper {
        background-color: #fff;
        padding: 0 .3rem;
        font-size: 0.26rem;
        font-family: simsun;
        
        .contract-logo {
            width: 40%;
			height: 2.5rem;
            margin: 0 auto;
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
            margin: 0 auto;
            td {
                padding: .1rem .12rem;
                border-bottom: 1px solid #999;
                border-right: 1px solid #999;

                // .cell {
                //     margin: .1rem 0;
                // }
                
                .newline {
            	    width: .35rem;
				    word-break: break-word;
				    display: block;
				    margin: 0 auto;
                }

                &.notify {
                    padding: 0; 
                    .tit {
                        padding: .1rem 0;
                        font-weight: 600;
                        border-bottom: 1px solid #999;
                        text-align: center;
                    }
                    .info {
                        padding: .1rem .12rem;
                    }
                }

                &.wuxiao {
                    background: url('../assets/wuxiao.png') no-repeat center center;
                    background-size: contain;
                }
                &.chaxu {
                    background: url('../assets/chaxu.png') no-repeat center center;
                    background-size: contain;
                }
            }
        }
        
        .user-info {
            position: relative;
            padding: .5rem 0;
            display: flex;
            justify-content: space-around;
            &>div{
                z-index: 9;
				>p {
					margin: .1rem 0;
				}
            }
            .seal {
                position: absolute;
                height: 100%;
                top: 0;
                bottom: 0;
                left: 25%;
                transform: translateX(-25%);
                opacity: .88;
                z-index: 1;

                &.mobile {
                    left: 80%;
                    transform: translateX(-80%);
                }
            }
        }
        
    }
</style>


