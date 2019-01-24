<template>
	<div class="scan-code">
		<div class="brand">
			<img src="../assets/brand.jpg" />
		</div>

		<div class="scan-box">
			<img src="../assets/show_icon.jpg" class="show-logo" />
	    	<x-button type="warn" action-type="reset" @click.native="scanCode()">
				<i class="iconfont">&#xe64e;</i>
				码上看详情
			</x-button>
		</div>
	    
	    <div class="info">
	    	<h4>查询方法</h4>
	    	<p>扫描恋爱凭证二维码，即可查询详情信息</p>
	    </div>
    </div>
</template>

<script>
	import { XButton } from 'vux'
	import wx from 'weixin-js-sdk'; 
	export default {
		components: {
	    	XButton
	  	},
	  	data () {
	  		return {
	  			
	  		}
	  	},
	  	created() {
	  		
	  	},
	  	methods: {
	  		scanCode(){
				this.$vux.loading.show();
				let url = "http://lx.hzyctools.com";
				let _that = this;
	  			this.$http.get(url + '/api/weixin/config?url=' + window.location.href).then(({data}) => {
					this.$vux.loading.hide();
					if (data.code !== 1) {
						this.$vux.toast.text(data.msg);
						return;
					}
					if (data && data.data) {
						let res = data.data;
						wx.config({
						    debug: res.debug, // 开启调试模式,
						    appId: res.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
						    timestamp: res.timestamp, // 必填，生成签名的时间戳
						    nonceStr: res.nonceStr, // 必填，生成签名的随机串
						    signature: res.signature,// 必填，签名，见附录1
						    jsApiList: res.jsApiList || ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
						});

						wx.ready(()=> {
			  				wx.scanQRCode({
				  				needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
				  				scanType: ["qrCode"],
				  				success: function (res) {
			                        let result = JSON.parse(res.resultStr); // 当needResult 为 1 时，扫码返回的结果
									_that.$router.push({
										path: '/contract',
										query: {
											order_no: result.order_no,
											rhino_sign: result.rhino_sign
										}
									})
			                    }
			  				})
			  			});
			  			
			  			wx.error((res)=> {
			  				this.$vux.toast.text(res);
      					})
			    	}
				});
	  		}
	  	}
	}
</script>

<style lang='less' scoped>
	.scan-code {
		height: 100%;
		background-color: #fff;
		.brand {
			img {
				width: 100%;
				height: auto;
				max-height: auto;
				display: block;
			}
		}
		
		.scan-box {
			width: 80%;
			margin: 8% auto;
			text-align: center;
			.show-logo {
				width: 1.4rem;
				display: inline-block;
				margin-bottom: .1rem;
			}
		}
		
		.info {
			position: absolute;
			bottom: 55px;
			z-index: 499;

			padding: .51rem;
			font-size: .24rem;
			h4 {
				font-size: .3rem;
			}
		}
	}
</style>