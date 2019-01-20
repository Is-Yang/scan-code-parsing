<template>
	<div class="scan-code">
		<div class="brand">
			<img src="../assets/brand.jpg" />
		</div>

		<div class="scan-box">
			<span><img src="../assets/show_icon.png" /></span>
	    	<x-button type="warn" action-type="reset" @click.native="scanCode()">码上看详情</x-button>
		</div>
	    
	    <div class="info">
	    	<h4>查询方法</h4>
	    	<p>扫描恋爱凭证二维码，即可查询详情信息</p>
	    </div>
    </div>
</template>

<script>
	import { XButton, querystring } from 'vux'
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
	  			let url = 'http://jd.kemi.moe:6080';
	  			this.$http.post('http://jd.kemi.moe:6080/api/weixin/config', querystring.stringify({url: url})).then(({data}) => {
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
			                        let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
			                        this.$vux.toast.text("扫描结果："+result);
		//	                        window.location.href = result;//因为我这边是扫描后有个链接，然后跳转到该页面
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

<style lang='less'>
	.scan-code {
		.brand {
			img {
				width: 100%;
			}
		}
		
		.scan-box {
			width: 80%;
			margin: 20px auto;
			text-align: center;
			span {
				display: inline-block;
				margin-bottom: 10px;
			}
		}
		
		.info {
			padding: 20px;
			font-size: 14px;
			h4 {
				font-size: 16px;
			}
		}
	}
</style>