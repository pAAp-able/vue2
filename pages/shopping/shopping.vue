<template>
	<view class="shopping">
		<view class="shopping-nav">欢迎来到购物车</view>

<div class="cart-page" v-if="isLogin&& !list" >
    
	<u-popup :show="show"  :round="10" mode="center" @close="close" @open="open">
			<view class="pop">
	            <view class="img-pay" >
					<image class="image-pay-show" src="../../static/pay.png" mode="widthFix"></image>
				</view>
			</view>
		</u-popup>
	
   <!-- 购物车列表 -->
         <div class="cart">
             <!-- 购物车列表头部 -->
             <ul class="m-inline-block">
                 <li class="inline-block item-goods">商品</li>
                 <li class="inline-block item-price">价格</li>
                 <li class="inline-block item-count">数量</li>
                 <li class="inline-block item-operate">操作</li>
             </ul>
             <!-- 标题 -->
             <div class="cart-title">购物车</div>
             <!-- 表身 -->
             <div class="table-box-inner">
                 
                      <!-- 遍历商品-->
                     <ul class="vFor" v-for="(item,index) in cartList" :key="index">
                         <li class="item-goods">
                             <!--选中商品-->
							 <checkbox class="goods-checkbox" :checked="item.item.checked" @click="selectItem(item)"/>
                            
                             <!--商品图片-->
                             <a class="goods-a" href=""><img :src="item.item.smallImg" alt=""></a>                      <!--商品详情-->
                             <div class="goods-info">
                                 <text>{{item.item.name}}</text>
                             </div>
                         </li>
                         <!--商品价格-->
                         <li class="item-price">
                             ￥{{item.item.price}}
                         </li>
                         <li class="item-count">
							 <!--减商品-->
							 <button class="btn-sub" @click="sub(item.item)">-</button>
                             {{item.item.count}}
							 <!--加商品-->
                             <button class="btn-add" @click="add(item.item)">+</button>
                         </li>
                         <li class="item-operate">
                             <!--删除商品-->
                             <button class="btn-del" @click="del(index)">X</button>
                         </li>
                     </ul>
                 
             </div>
         </div>
         <!-- 总计 -->
         <div class="totals">
             <div class="total">
                 <p>共&nbsp;<em>{{totalNum}}</em>&nbsp;件商品</p>
                 <p>总金额&nbsp;<em>￥{{totalPrice}}</em>&nbsp;
                     </p>
             </div>
             <div class="pays" >
                 <div class="pay-p pay">请在倒计时结束前结算&nbsp;&nbsp;|
                     &nbsp;&nbsp;总金额&nbsp;<em>￥{{totalPrice}}</em>&nbsp;
                 </div>
                 <div class="pay-a pay">
                   <button @click="show = true">立即结算</button>
                 </div>
             </div>
         </div>

  </div>

		<view class="shopping-container" v-if="list">
			<view class="shopping-icon">
				<image class="icon-pictrue" src="../../static/shopingcar.png"> </image>
			</view>

			<view class="shopping-des"> 购物车还是空空如也</view>

			<view class="shopping-btns" @click="gotoIndex">到商城去逛逛</view>
		</view>

	</view>
</template>

<script>
	import store from '../productDetail/store/index.js';
import { mapGetters } from 'vuex';
	
	export default {
		 name:'Cart',
		
		store,
		data() {
			return {
                 isEmtly:true,
                isLogin:false,
				show:false,
				islist:true
		}
		},
		computed:{
		
		        //保存的数据
		
		        //购物车选中结算的总价格和总数量
		
		        ...mapGetters(['totalPrice']),
		
		        ...mapGetters(['totalNum']),
		
		        cartList(){
		            
		           //返回购物车中的商品数据
				   
				   if(this.$store.state.cartList==null){
					   this.islist=true;
				   }else{
					   this.islist=false;
				   }
				   
		
		            return this.$store.state.cartList;
		
		        },
		
		      },

		
		
		
		
		onLoad() {
			this.isGotoLogin();
			console.log("-------login",this.isLogin);
			if(!this.isLogin){
				uni.showToast({
					title:"正在前往登录. . .",
					con:'none'
				})
				
				setTimeout(()=>{
					uni.navigateTo({
						url:"../login/login"
					})
				},1000)
			}
		},
		
		
		methods: {
			created() {
				// 通过 $route.query 获取传递的查询参数
			    this.number = this.$route.query.number;
			},
			
			//结算
			close() {
			          this.show = false
			          // console.log('close');
			        },
			
			 //点击商品的复选框
			
			selectItem(item){
	
				this.$store.dispatch("selectItem",item);
	
			},
	
			//加商品
	
			 add(item){
				this.$store.dispatch("addItem", item);
			 },

			 //减商品
			 sub(item){
				this.$store.dispatch("subItem", item);
			 },

			 //删除商品
			 del(index){
				this.$store.dispatch("delete", index);
			 },
			
			     

			
			isGotoLogin(){
						  let token = JSON.parse(localStorage.getItem("token"));
						  
						  if(token){
							  this.isLogin = true;
						  }else{
							  this.isLogin = false;
						  }
			},
			
			gotoLogin(){
						  uni.navigateTo({
						  	url:"/pages//login/login"
						  })
			},
			
			
              
			  gotoIndex(){
				  uni.showToast({
				  	title:"加 载 中 . . .",
					icon:'none'
				  })
				  
				  setTimeout(()=>{
					  uni.switchTab({
					  	url:"../index/index"
					  })
				  },500)
			  }
		}
	}
</script>

<style>
.shopping {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.shopping-nav {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: #0c34ba;
  color: #fff;
}


.cart-page {
  width: 100%;
   height: 100%;
  display: flex;
 
  flex-direction: column;
 
  justify-content: center;
  background-color: white;
  padding: px;
  box-sizing: border-box;
}

.cart {
  width: 100%;
  max-width: 600px;
	
  background-color: #f1f1f1;
}

.cart ul {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 10px 20px;
  margin: 0;
  
  background-color: #f5f5f5;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: 1rpx solid #000;
  list-style: none;
}

.cart ul li {
 
  text-align: center;
}

.cart-title {
  font-size: 18px;
  font-weight: bold;
  padding: 10px 20px;
  background-color: #f5f5f5;
  text-align: center;
  border-bottom: 1px solid #ddd;
}
.table-box-inner {
	position: absolute;
	top: 100px;
	width: 375px;
  overflow: auto;
  max-height: 420px;
  margin: 0;
  padding: 0;
}

table {
  width: 100%;
  border-collapse: collapse;
}

td {
	margin: 0;
 /* padding: 10px 20px; */
  border-bottom: 1px solid #ddd;
}

.item-goods {
	margin-left: 0;
	width: 40%;
	display: flex;
	align-items: center;
	font-weight: bold;
	text-align: center;
}
.m-inline-block .item-goods{
	box-sizing: border-box;
	width: 250rpx;
	padding-left:100rpx;
}
.item-price {
  width: 20%;
  font-weight: bold;
}
.m-inline-block .item-price{
	width: 150rpx;
}
.item-count {
  width: 120rpx;
  display: flex;
  align-items: center;
  font-weight: bold;
  justify-content: space-between;
}
.m-inline-block .item-count{
	box-sizing: border-box;
	padding-left: 30rpx;
}
.item-operate {
  width: 20%;
  display: flex;
   font-weight: bold;
  align-items: center;
  justify-content: center;
}

.goods-checkbox {
  margin-right: 10px;
}

.goods-a {
  display: block;
  width: 200px;
  height: 50px;
}

.goods-a img {
  width: 80%;
  height: 100%;
  border-radius: 26rpx;
  object-fit: cover;
}

.goods-info {
  margin-left: 10px;
}

.btn-add,
.btn-sub {
  width: 20px;
  height: 40rpx;
  font-size: 36rpx;
  line-height: 40rpx;
  text-align: center;
  background-color: white;
  border: 1rpx rgb(204, 204, 204) solid;
}

.btn-add:active,
.btn-sub:active {
background-color: rgb(204, 204, 204);
  color: #999;
}

.btn-add {
  margin-left: 10rpx;
}

.btn-sub {
  margin-right: 10rpx;
}

.totals{
	font-size: 15px;
	font-weight: bolder;
	width: 100%;
	position: absolute;
	bottom: 0;
	background-color: #f1f1f1;
	
	
}
.btn-del{
	margin-left: 30px;
}
.vFor{
	padding: 10px;
	list-style-type:none
}

.image-pay-show{
	height: 100%;
	width: 100%;
}

.pop{
	height: 300px;
	width: 300px;
}
.pay-a{
	width: 80%;
	margin: 0rpx auto;
	background-color: rgb(204, 204, 204);
	border-radius: 30%;
}
</style>

