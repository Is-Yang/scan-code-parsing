<template>
	<!-- 由于打印时图片都消失了，所以全部用img标签来 -->
    <div style="height: 100%;">
		<div class="code-parsing">
			<img class="box" src="../assets/box.jpg" alt="边框"/>
	
			<div class="parsing-content">
				<div class="head-logo">
					<img src="../assets/title.png" alt="logo" />
				</div>
				<div class="code">
					<p>合约单号</p>
					<p class="no">{{form.orderNo}}</p>
				</div>
				<div class="user-info">
					<div>
						<span>签约人姓名：{{form.realityName}}</span>
						<span>性别：{{form.weight}}</span>
					</div>
					<div>
						<span>心上人姓名：{{form.companyName}}</span>
						<span>性别：{{form.stature}}</span>
					</div>
					<div>
						<span>身份证号码：{{form.idCardNumber}}</span>
					</div>
				</div>
				<div class="details">
					自恋爱合约生效之日起<span>&nbsp;3&nbsp;</span>年后
					<span>10</span>年内，您们共同说出“我愿意”的那一天，我们将送上<span class="tip">〔 {{form.productName}} 〕</span>见证您们的爱情，无论顺境还是逆境、富裕或是贫穷、健康或是疾病，一生只爱你一人，以此为证，承诺此生真爱不变。
					<img class="print" src="../assets/fingerprint.png" />
				</div>
				<div class="spouse"></div>
				<div class="code">
					<p>生效日期：{{form.dateTime}}</p>
					<p>广东中融股权投资有限公司</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		components: {

	  	},
	  	data () {
	  		return {
				form: {}
	  		}
		},
		mounted () {
			
		},
	  	created() {
			this.$vux.loading.show();
			if (this.$route.query) {
				let order_no = this.$route.query && this.$route.query.order_no;
				let rhino_sign = this.$route.query && this.$route.query.rhino_sign;

				let url = 'http://love.hzyctools.com';
				this.$http.get('/love_contract?order_no=' + order_no + '&rhino_sign=' + rhino_sign).then(({data}) => {
					this.$vux.loading.hide();
					if (data.code !== 1) {
						this.$vux.toast.text(data.msg);
						return;
					}
					if(data && data.data) {
						let res = data.data;
						let {
							CompanyName,
							RealityName,
							Stature,
							Weight,
							ProductName,
							DateTime,
							IDCardNumber,
							OrderNo
						} = res;

						this.form = {
							orderNo: OrderNo,
							companyName: CompanyName,
							realityName: RealityName,
							stature: Stature,
							weight: Weight,
							productName: ProductName,
							dateTime: DateTime,
							idCardNumber: IDCardNumber
						}
					}
				})
			}
	  	},

	}
</script>

<style lang="less" scoped>
	.code-parsing {
		position: relative;
		@bottom: 58px;
		height: calc(~"100%" - @bottom);
		padding: 30px 5%;
		font-size: 0.26rem;
		font-family: kaiti;

		.parsing-content {
			height: 100%;
			overflow: auto;
		}
		.box {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: -1;
			width: 100%;
			height: 100%;
		}
	

		.head-logo {
			width: 70%;
			margin: -5px auto -10px;
			// background: url('../assets/title.png') no-repeat top center;
			// background-size: contain;
			text-align: center;

			img {
				width: 100%;
			}
		}

		.code {
			padding: 10px 20px;
			text-align: center;
		}

		.user-info {
			width:67%;
			margin: auto;
			border-top: 1px dashed #888;
			border-bottom: 1px dashed #888;
			padding: 5px 0;
			&>div{
				display: flex;
				margin: 5px 0;
				>span:first-child {
					flex: 1;
					padding-right: 15px;
				}
			}
		}

		.details {
			width: 80%;
			margin: 20px auto;
			text-indent: 34px;

			span {
				margin: 0 4px;
			}

			.tip {
				color: red;
			}

			.print {
				vertical-align: -webkit-baseline-middle;
				margin-left: -0.8rem;
				opacity: .7;
				height: .85rem;
			}
		}

		// .spouse {
		// 	width: 80%;
		// 	height: 115px;
		// 	margin: 10px auto;
		// 	background: url('../assets/spouse.jpg') no-repeat top center;
		// 	background-size: contain;
		// }
	}
</style>
