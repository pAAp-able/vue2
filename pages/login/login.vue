<template>
	<view class="login">
		<h1 class="login-title">登录界面</h1>
		<u--form  class="login-form" :model="login">
			<u-form-item class="_body" label="账号">
				<!-- v-model指令 数据双向绑定 限制在input select textarea 这几个组件使用 -->
				<u--input type="text" placeholder="请输入你的账号名..." v-model="login.phone"></u--input>
			</u-form-item>
			<u-form-item class="_body" label="密码">
				<!-- <u--input type="password" placeholder="请输入你的密码..."></u--input> -->
				<u--input type="text" placeholder="请输入你的密码..." v-model="login.password"></u--input>
			</u-form-item>
		</u--form>

<!-- 		<view class="btns">
			<u-button type="primary" shape="circle" text="登录" @click="submit"></u-button>
		</view>
		<navigator url="../forgetpassword/forgetpassword">
			<view class="forgetpassword">
				<u-button type="primary" shape="circle" text="忘记密码"></u-button>
			</view>
		</navigator>
		<navigator url="../register/register">
			<view class="login">
				<u-button type="primary" shape="circle" text="快速注册"></u-button>
			</view>
		</navigator> -->
		
		<view class="btns">
			<u-button class="btns-login" type="primary" text="登录" @click="gotoIndex"></u-button>
			<u-button class="btns-forgetpassword" type="primary" text="忘记密码" @click="gotoForgetpassword"></u-button>
			<u-button class="btns-register" type="primary" text="快速注册" @click="gotoRegister"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				login: {
					phone: "",//存放登录账号
					password:"",//存放登录密码
					nickName:""
				}
			}
		},
		onLoad(){
			let regData = JSON.parse(localStorage.getItem("registerInfo"));
			this.login.phone = regData.phone;
			this.login.password = regData.password;
			this.login.nickName = regData.nickName;
		},
		methods: {
			// // gotoindex(){
			// // 	uni.switchTab({
			// // 		url: '/pages/index/index'
			// // 	});
			// // }
			// submit(){
			// 	uni.getStorage({
			// 		key: this.login.phone,
			// 		success:(res) =>{
			// 			const dealmsg = JSON.parse(res.data)
			// 			if(!(dealmsg.password===this.login.password) || this.login.password==""){
			// 				uni.showToast({
			// 				title:"密码输入有误！",
			// 				icon:"error",
			// 				})
			// 				return;
							
			// 			}
			// 			uni.switchTab({
			// 				url: '/pages/index/index'
			// 			});
			// 		}
			// 	});
				
			// }
			gotoIndex(){
				uni.request({
					method:"POST",
					url:"http://www.kangliuyong.com:10002/login",
					data:{
						appkey:"U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
						password:this.login.password,
						phone:this.login.phone
					},
					header:{
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
					},
					success: (res) => {
						// console.log('执行成功返回的回调函数=>',res)
						// if(res.data.code==202){
						// 	uni.showToast({
						// 		title:'密码错误',
						// 		icon:'error'
						// 	})
						// }else if(res.data.code==200&&this.login.phone!=''&&this.login.password!=''){
						// 	localStorage.token=JSON.stringify(res.data.token)
						// 	uni.showToast({
						// 		title:'登陆成功',
						// 	})
						// 	uni.switchTab({
						// 		url:'../../pages/index/index'
						// 	})
							
						// }else{
						// 	uni.showToast({
						// 	title:'请输入账号密码',
						// 	icon: 'error'
						// 	})
						// }
						localStorage.token=JSON.stringify(res.data.token)
						uni.getStorage({
							key:'registerInfo',
							success:(res) =>{
								
								const dealmsg = JSON.parse(res.data)
								if(!(dealmsg.phone===this.login.phone) || this.login.phone==""){
									uni.showToast({
									title:"账号输入有误！",
									icon:"error",
									})
									return;
								}
								if(!(dealmsg.password===this.login.password) || this.login.password==""){
									uni.showToast({
									title:"密码输入有误！",
									icon:"error",
									})
									return;
								}
								uni.switchTab({
									url: '/pages/index/index'
								});
								}
							});
					}
				})
			},
			gotoForgetpassword(){
				uni.navigateTo({
					url:"/pages//forgetpassword/forgetpassword"
				})
			},
			gotoRegister(){
				uni.navigateTo({
					url:"/pages/register/register"
				})
			}
		
		}
	}
</script>

<style>
	.login-title{
		display: flex;
		justify-content: center;
		width: 260px;
		margin: 10px auto;
	}
	.login-form{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	/deep/.u-form-item{
		width: 86%;
	}
	/deep/.u-form-item__body__left{
		font-weight: bold;
	}
	.u-button{
		width: 56%;
		border-radius: 40rpx;
		background-color: #0c34ba;
		border-color: #0c34ba
	}
	.btns-login{
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}
	.btns-forgetpassword{
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}
		
</style>
