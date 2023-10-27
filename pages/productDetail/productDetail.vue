<template>
	<div class="product-detail">
		<div class="product-detail-big">
			<div class="details-nav-out">
				<view class="details-nav">
					<text class="details-return" @click="back"> &lt;返回 </text>
					<text class="details-product"> 商品详情</text>
				</view>
			</div>
			
			<div class="details-products">
			  <img class="list-picture" :src="$route.query.largeImg" mode="widthFix">
			</div>
				
			<div class='content-introduce'>
				<div class="product-info">
					<view class="list-info">
						<view class="left-info-name">
							<view class="chinese-name">{{$route.query.name}}</view>
							<view class="english-name">{{$route.query.enname}}</view>
						</view>
						<view class="right-info-price">¥&nbsp;{{$route.query.price}}</view>
					</view>
					<hr>
					
					<view class="list-tem">
						<view class="left-tem-name">{{$route.query.tem_desc}}</view>
						<view class="right-tme-type">
							<text class="tem-text" v-on:click="temSelectButton1()" v-bind:class="{ 'active':tembutton1Selected}">冷</text>
							<text class="tem-text" v-on:click="temSelectButton2()" v-bind:class="{ 'active':tembutton2Selected}">热</text>
						</view>
					</view>
					
					<view class="list-sugar">
						<view class="left-sugar-name">{{$route.query.sugar_desc}}</view>
						<view class="right-sugar-type">
							<text class="sugar-text" v-on:click="sugarSelectButton1()" v-bind:class="{ 'active':sugarbutton1Selected}"> 无糖</text>
							<text class="sugar-text" v-on:click="sugarSelectButton2()" v-bind:class="{ 'active':sugarbutton2Selected}"> 半糖</text>
							<text class="sugar-text" v-on:click="sugarSelectButton3()" v-bind:class="{ 'active':sugarbutton3Selected}"> 全糖</text>
						</view>
					</view>
					<hr>
					
					<view class="list-number">
						<view class="left-number-name">选择数量</view>
						<view class="right-number-type">
							<u-number-box integer v-model="value" @change="valChange"></u-number-box>
						</view>
					</view>
					
					<hr>
					<view class="list-desc">
						<view class="list-desc-title">商品描述</view>
						<view class="list-desc-content">
							{{$route.query.desc}}
						</view>
					</view>
				</div>
			</div>
		</div>
		
		<view class="bottom">
			<view class="title" @click="gotoShopping">
				<view class="picture">
					<image src="../../static/shopbag1.png" mode=""></image>
				</view>
				<view>购物袋</view>
			</view>
			<view class="title1">
				<view class="image" v-on:click="toggleIcon" v-bind:class="{ 'icon1': isIcon1Shown, 'icon2': !isIcon1Shown }"></view>
				<view>收藏</view>
			</view>
			<u-button  class="bottom-button1" @click="addToCart($route.query)" type="primary" text="加入购物车"></u-button>
			<u-button  class="bottom-button2" text="立即购买"></u-button>
		</view>
	</div>
</template>



<script>
	
	import store from './store/index.js';
	
	export default {
		
		store,
		data() {
			return {
				value: 0,
				isButtonClick:false,
				tembutton1Selected: false,
				tembutton2Selected: false,
				sugarbutton1Selected: false,
				sugarbutton2Selected: false,
				sugarbutton3Selected: false,
				pictureList:[
					{
						img:"../../static/aixing.png",
						activeImg:"../../static/aixing1.png",
						isActive:false},
				],
				isIcon1Shown: true,
			}
		},
		methods: {
			addToCart(item){
				 //加入购物车
					console.log("已成功添加购物车")
				this.$store.dispatch('addCart',item);
			},
			back(){
				if (window.history.length <= 1) {
					this.$router.push({path:'/'})
					return false
				} else {
					this.$router.go(-1)
				}
			},
			buttonClick(){
				this.isButtonClick = true
			},
			temSelectButton1() {
			  this.tembutton1Selected = true;
			  this.tembutton2Selected = false;
			},
			temSelectButton2() {
			  this.tembutton1Selected = false;
			  this.tembutton2Selected = true;
			},
			sugarSelectButton1() {
			  this.sugarbutton1Selected= true;
			  this.sugarbutton2Selected= false;
			  this.sugarbutton3Selected= false;
			},
			sugarSelectButton2() {
			  this.sugarbutton1Selected= false;
			  this.sugarbutton2Selected= true;
			  this.sugarbutton3Selected= false;
			},
			sugarSelectButton3() {
			  this.sugarbutton1Selected= false;
			  this.sugarbutton2Selected= false;
			  this.sugarbutton3Selected= true;
			},
			toggleIcon() {
				  this.isIcon1Shown = !this.isIcon1Shown;
			},
			gotoShopping(){
				this.$router.push({
				  path: '../shopping/shopping',
				  query: { 
					  number: this.number }
				})
			},
		}
	}
</script>

<style>
template{
	position: relative;
}
.details-nav-out
{
	text-align: center;
	line-height:75rpx;
	height: 75rpx;
	overflow: hidden;
	background-color: rgb(248, 248, 248)
}
.details-return
{
	line-height:71rpx;
	border: 1rpx solid rgb(206, 206, 206);
	position: absolute;
	top: 0rpx;
	left: 0rpx;
	padding: 0rpx 10rpx;
	border-radius: 10rpx;
}
.details-nav .details-product
{
	font-weight: bolder;
}
.list-picture
{
	width: 100%;
}
.list-picture image
{
	width: 100%;
}
.content-introduce
{
	position: relative;
	top: -40rpx;
	width: 86%;
	background-color: rgba(255, 255, 255,1);
	border-radius: 18rpx 18rpx 0 0;
	margin-left: 7%;
}	
.list-info
{
	display: flex;
	justify-content: space-between;
	margin: 10rpx;
}
.left-info-name view
{
	margin:0rpx 10rpx;
}
.chinese-name
{
	font-size: 55rpx;
	font-weight: bolder;
}
.english-name
{
	font-size: 35rpx;
}	
.right-info-price
{
	color: #0a33ba;
	font-weight: bolder;
	font-size: 45rpx;
	margin-top: 40rpx;
}
.list-number
{
	display: flex;
	justify-content: space-between;
	margin: 10rpx 0rpx;
}
.list-tem,.list-sugar
{
	display: flex;
	justify-content: flex-start;
	margin: 10rpx 0rpx;
}
.list-tem view,.list-sugar view,.list-number view
{
	margin: 5rpx;
}
.left-tem-name,.left-sugar-name{
	width: 75rpx;
	text-align: center;
	align-items: center;
	line-height: 50rpx;
}
.sugar-text,.tem-text
{
	float: left;
	width: 100rpx;
	height: 50rpx;
	line-height: 50rpx;
	border: 1px solid transparent;
	padding: 5rpx 20rpx;
	text-align: center;
	background-color: rgb(232, 232, 232);
	color: rgb(124, 116, 127);
	margin-left: 20rpx;
	border-radius: 20rpx;
}
.nember-text
{
	width: 15rpx;
	text-align: center;
	background-color: rgb(232, 232, 232);
	color: rgb(124, 116, 127);
	margin-left: 30rpx;
	border-radius: 50%;
}
.list-desc-title,.left-sugar-name,.left-tem-name,.left-number-name
{
	font-weight: bolder;
	font-size: 35rpx;
}
.active{
	background-color: rgb(12, 56, 186);
	color: white;
}
.bottom{
	position: absolute;
	bottom:0rpx
}
.title image{
	width: 50rpx;
	height: 50rpx;
}
.title1 view{
	margin-bottom: 5px;
}
.title .picture{
	text-align: center;
}
.icon1{
	background-image: url("../../static/aixing.png");
	background-size: 50rpx;
	width: 50rpx;
	height: 50rpx;
}
.icon2{
	background-image: url("../../static/aixing1.png");
	background-size: 50rpx;
	width: 50rpx;
	height: 50rpx;
}
.bottom
{
	height: 120rpx;
	position: sticky;
	bottom: 0;
	display: flex;
	background-color: white
}
.bottom .title,.bottom .title1
{
	margin: 0rpx 10rpx;
}
.title,.title1
{
	padding: 10rpx 20rpx;
}
.bottom-button1,.bottom-button2{
	margin: auto 10rpx;
	line-height: 35px;
	height: 35px;
	padding: 10rpx 20rpx;
	color: white;
	width: 200rpx;
}
.bottom-button1
{	
	background-color: rgb(106, 145, 236);
	border-radius: 20rpx 0rpx 0rpx 20rpx;
}
.bottom-button2
{	
	background-color:rgb(12, 52, 186) ;
	border-radius: 0rpx 20rpx 20rpx 0rpx;
	
}
</style>