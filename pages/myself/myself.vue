<template>
	<view class="my"> 
		<view class="my-bg">
			<image class="bg-picture" :src="info.userBg" mode="widthFix" @click="upbp_picture"></image>
		</view>
		<view class="my-container">
			<view class="container-introduce">
				<view class="introduce-left" v-if="isLogin" @click="upAvater">
					<image class="left-avatar" :src="info.userImg" mode="widthFix"></image>
				</view>
				<view class="introduce-right" v-if="isLogin">
					<view class="right-nickname">{{info.nickName}}</view>
					<view class="right-desc">这个家伙很懒，什么也没有留下...</view>
				</view>
				<view class="introduce-isLogin" v-if="!isLogin" @click="goToLogin">请先登录</view>
			</view>
		</view>
		<view class="container-info">
			<view class="info-list">
				<text class="list-information">个人资料</text>
				<image class="list-icon" src="/static/dayufuhao.png" mode="widthFix"></image>
			</view>
			<view class="info-list">
				<text class="list-MyOrder">我的订单</text>
				<image class="list-icon" src="/static/dayufuhao.png" mode="widthFix"></image>
			</view>
			<view class="info-list">
				<text class="list-collect">我的收藏</text>
				<image class="list-icon" src="/static/dayufuhao.png" mode="widthFix"></image>
			</view>
			<view class="info-list">
				<text class="list-AddressAdministration">地址管理</text>
				<image class="list-icon" src="/static/dayufuhao.png" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import{
		pathToBase64,
		base64ToPath
	}from '../../js_sdk/mmmm-image-tools/index.js'
	export default {
		data() {
			return {
				isLogin:false,
				info:{}
			}
		},
		onShow(){
			this.isGoToLogin();
			this.getUserInfo();
		},
		methods: {
			isGoToLogin(){
				let token = JSON.parse(localStorage.getItem("token"));
				if(token){
					this.isLogin = true;
				}else{
					this.isLogin = false;
				}
			},
			goToLogin(){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			},
			getUserInfo(){
				if(!this.isLogin){
					return;
				}
				let tokenString = JSON.parse(localStorage.getItem("token"));
				this.$uni({
					url:"/findMy",
					data:{
						tokenString
					}
				}).then(res => {
					console.log("getUserInfo()==>",res);
					console.log("getUserInfo()注册的用户昵称==>",res[0].nickName);
					console.log("getUserInfo()默认的背景图像==>",res[0].userBg);
					console.log("getUserInfo()默认的用户头像==>",res[0].userImg);
					this.info = res[0];
				})
			},
			
			upAvater(){
				uni.chooseImage({
					success:(res)=>{
						console.log('方法4res ==>',res.tempFilePaths[0]);
						pathToBase64(res.tempFilePaths[0]).then(base64=>{
							let serverBase64  = base64.replace(/^data:image\/[A-Za-z]+;base64,/,'');
							console.log("方法4-先选择图片作为用户头像 serverBase64 =>",serverBase64);
							this.userImg(serverBase64);
						})
					}
				})
			},
			userImg(serverBase64Img){
				uni.showLoading({
					title:"用户头像加载中.."
				})
				let tokenString = JSON.parse(localStorage.getItem("token"));
				this.$uni({
					url:"/updateAvatar",
					method:"POST",
					data:{
						imgType:"",
						tokenString,
						serverBase64Img
					},
					header:{
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
					}
				}).then(res => {
					console.log("res ==> ",res);	
					uni.hideLoading();
					this.getUserInfo();
				})
			},
			upbp_picture(){
				uni.chooseImage({
					success:(res)=>{
						console.log('方法4res ==>',res.tempFilePaths[0]);
						pathToBase64(res.tempFilePaths[0]).then(base64=>{
							let serverBase64  = base64.replace(/^data:image\/[A-Za-z]+;base64,/,'');
							this.userbp_picture(serverBase64);
						})
					}
				})
			},
			userbp_picture(serverBase64Img){
				uni.showLoading({
					title:"用户背景加载中.."
				})
				let tokenString = JSON.parse(localStorage.getItem("token"));
				this.$uni({
					url:"/updateUserBg",
					method:"POST",
					data:{
						imgType:"",
						tokenString,
						serverBase64Img
					},
					header:{
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
					}
				}).then(res => {
					console.log("res ==> ",res);	
					uni.hideLoading();
					this.getUserInfo();
				})
			}
			
		}
	}
</script>

<style>
	.my{
		height: calc(100vh - 100rpx);
		background-color: #f5f1f1;
	}
	.my-container{
		display: flex;
		justify-content: center;
	}
	.container-introduce{
		position: relative;
		top: -100rpx;
		display: flex;
		width: 85%;
		padding: 20rpx;
		background-color: rgba(237, 236, 236, 0.8);
		border-radius: 18rpx 18rpx 0 0;
	}
	.bg-picture{
		width: 100%;
	}
	.introduce-left{
		width: 180rpx;
		height: 180rpx;
		border-radius: 50%;
		overflow: hidden;
		border: 5rpx solid #0c34ba;
		margin-right: 30rpx;
	}
	.left-avatar{
		width: 100%;
		height: 100%;
	}
	.introduce-right{
		position: absolute;
		left: 240rpx;
		width: calc(100% - 240rpx);
	}
	.right-nickname{
		padding: 20rpx 0;
		font-weight: bold;
		color: #0831b9;
	}
	.right-desc{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 26rpx;
		color: #666;
	}
	.container-info{
		position: relative;
		top: -100rpx;
		margin: 0 36rpx;
		padding: 0 20rpx;
		background-color: #fff;
	}
	.info-list{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100rpx;
		border-bottom: 1rpx solid #ddd;
		font-size: 28rpx;
		color: #666;
	}
	.info-list:last-child{
		border-color: #fff;
	}
	.list-icon{
		width: 28rpx;
	}
	.introduce-isLogin{
		background-color: #f5f1f1;
		padding: 30rpx 5rpx;
	}
</style>
