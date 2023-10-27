<template>

	<view class="content">
		<view class="nav">
			<view class="nav-left">
				<text class="hello">{{timeText}}</text>
				<view class="islogin">
					<view class="username" v-if="!isLogin" @click="goToLogin">请先登录</view>
					<view class="username" v-if="isLogin">{{nickName}}</view>
				</view>
			</view>
			<view class="nav-right">
				<div class="search" @click="getsearch">
					<u-search  shape="round" v-model="keyword" :showAction="false"></u-search>
				</div>
			</view>
		</view>
		<view class="picture">
			<u-swiper	
				:list="swiperImg"
				height="250px"
				indicator
				indicatorMode="line"
			></u-swiper>
		</view>
		
		<view class="bbig">
			<view class="hottitle">
				<div class="big">
					<div class="in">热卖推荐</div>
				</div>
			</view>
			
			<view class="recommend-items">
				<view class="list-items" v-for="(item,index) in HotProduct" :key="index" @click='open(item)'>
					<view class="item-picture">
						<image class="picture-show" :src="item.smallImg" mode="widthFix"></image>
					</view>
					<view class="item-chinese-name">{{item.name}}</view>
					<view class="item-english-name">{{item.enname}}</view>
					<view class="item-price">¥&nbsp;{{item.price}}</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// list1: [
				// 	// '../../static/ruixing7.png',
				//  //    '../../static/ruixing4.png',
				// 	// '../../static/ruixing6.png',
				// 	'../../static/ruixing8.jpg',
				// 	'../../static/ruixing10.png',
				// 	'../../static/ruixing11.png',
				// 	],
				isLogin:false,
				timeText:"",
				keyword: '请输入商品内容',
				swiperImg:[],
				nickName:"",
				HotProduct:[],
				detailed:[],
				opendetaiel:[{
					desc:1,
					enname:1,
					name:1,
					price:1,
					smallImg:1,
					sugar:1,
					sugar_desc:1
				}],
				
			}
		},
		onLoad() {

		},
		created()
		{	
			//调用方法1
			this.getSwiper();
			//调用方法2
			this.getHotProduct();
			this.getTime();
			this.isGoToLogin();
			this.getMyself();
		},
		methods: {
			//定义方法1
			getsearch()
			{
				uni.navigateTo({
					url:"../../pages/search/search"
				})
			},
			getSwiper()
			{
				uni.request({
					url:"http://www.kangliuyong.com:10002/banner",
					method:"GET",
					data:
					{
						appkey:"U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA="
					},
					success:(res) => {
						console.log("getSwiper==>",res);
						let getArr = res.data.result;
						getArr.forEach((item) => {
							this.swiperImg.push(item.bannerImg);
							console.log("this.swiperImg数组一次添加数组元素=>",this.swiperImg);
						})
					}
				})
			},
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
			getMyself(){
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
					this.nickName = res[0].nickName
					})
			},
			getTime(){
				let time = new Date().getHours()
				console.log('事件',time);
				if(time>=6 && time<12){
					this.timeText="上午好"
				}
				else if(time>=12 && time<15){
					this.timeText="中午好"
				}
				else if(time>=15 && time<18){
					this.timeText="下午好"
				}
				else if(time>=18 && time<24){
					this.timeText="晚上好"
				}
				else if(time>=0 && time<6){
					this.timeText="凌晨好"
				}
			},
			//定义方法2
			getHotProduct()
			{
				uni.request(
					{
						url:"http://www.kangliuyong.com:10002/typeProducts",
						method:"GET",
						data:
						{
							appkey:"U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
							key:"isHot",
							value:1
						},
						success:(res)=>
						{
							// console.log("index res==>",res)
							if(res.data.code ===500)
							{
								console.log("getHotProduct() res==>",res);
								console.log("getHotProduct() res.data.result",res.data.result);
								this.HotProduct = res.data.result
								console.log("data下的HotProduct 重新赋值 =>",this.HotProduct)	
							}
						}
					})
			},
			open(item) {
				console.log("item------->", item);
				uni.request({
					method: 'GET',
					url: "http://www.kangliuyong.com:10002/productDetail",
					data: {
						appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
						
				         pid:item.pid
					},
					//请求头
					header: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
					},
						
					success: (res) => {
						this.detailed = res.data.result;
						this.detailed[0].count = 1;
						this.detailed[0].checked = false;
						console.log("getdetailed=>", this.detailed[0].sugar_desc);
				        console.log("getdetailed-0---=>", res.data.result);
						console.log("item.small_img---=>", item.sugar_desc);
						uni.navigateTo({
							   url: `../productDetail/productDetail?desc=${this.detailed[0].desc}&name=${this.detailed[0].name}&enname=${this.detailed[0].enname}&smallImg=${this.detailed[0].small_img}&price=${this.detailed[0].price}
							   &sugar=${this.detailed[0].sugar}&sugar_desc=${this.detailed[0].sugar_desc}&tem_desc=${this.detailed[0].tem_desc}&tem=${this.detailed[0].tem}&largeImg=${this.detailed[0].large_img}&count=${this.detailed[0].count}&checked=${this.detailed[0].checked}`
							  })
						
					}
						
				})
			},
			getProductDetail(pid,type)
			{
				//获取商品的Pid值和type值
				console.log("商品的pid值为",pid);
				console.log("商品的类型为值为",type)
				// 转跳到商品详情页面
				uni.navigateTo({
					url:"../productDetail/productDetail?id="+pid
				})
				
			}
		}
	}
</script>

<style>
	.content
	{
		background-color: rgb(247, 247, 247)
	}
	.nav {
		height: 90rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}	
	.nav-left{
		display: flex;
		justify-content: flex-start;
	}
	.nav-left .username
	{
		color: rgb(12, 58,186);	
		font-weight: bolder;
		margin-left: 10px;
	}
	.hottitle .big
	{
		margin-top: 10px;
		height: 80px;
		background-color: white;
		border-radius: 10px;
	}
	.bbig
	{
		padding: 12px;
	}
	.hottitle .big .in
	{
		width: 80px;
		height: 50px;
		background-color: rgb(10, 47, 150);
		color: rgb(248, 255, 255);
		line-height: 50px;
		position: relative;
		top: 15px;
		padding: 0px 15px;
		border-top-right-radius:25px
	}
	.recommend-items
	{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 30rpx	;
	}
	.list-items
	{
		width: 45%;
		box-sizing: border-box;
		padding: 20rpx;
		background-color: #fff;
		margin-bottom: 30rpx;
		border-radius: 20rpx;
	}
	.item-picture
	{
		width: 100%;
		position: relative;
	}
	.picture-show
	{
		width: 100%;
		border-radius: 30rpx;
	}
	.item-chinese-name
	{
		font-size: 	38rpx;
		color: #444;
	}
	.item-english-name
	{
		color:rgb(165, 156, 179);
		font-size: 25rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.item-price
	{	
		margin-top: 24rpx;
		color: rgb(12, 52,186);
		font-size: 40rpx;
		font-weight: bolder;
	}
	
	.item-picture::before
	{
		content: "hot";
		position: absolute;
		color: #fff;
		padding: 8rpx 8rpx;
		z-index: 998;
		left: 15rpx;
		background-color: #0c34ab;
		border-radius: 15rpx 0 10rpx 10rpx;
	}
	.uni-tabbar-bottom
	{
		position: absolute;
		z-index: 999;
	}
	
</style>
