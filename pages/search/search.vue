<template>
	<view>
		<!-- 顶部 -->
		<div class='nav'>
			<view class="topnav">
				<text class="details-return" @click="back"> &lt;返回 </text>
				<u-search class="search" placeholder="输入商品信息.." v-model="keyword"></u-search>
			</view>
			<!-- 搜索结果 -->
			<view class="recomend_show">
				<view class="shopping_list_all" v-for="(item , index) in searchCoffee" :key="index" @click='open(item)'>
						<div class="shopping_picture">
							<img class="shopping_picture_show" :src="item.largeImg">
						</div>
						<div class="ch_en_name">
							<div class="shopping_chname"> {{item.name}} </div>
							<div class="shopping_enname"> {{item.enname}} </div>
						</div>
						<div class="shopping_price"> ¥{{item.price}} </div>
				</view>
			</view>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				allCoffee:[],
				searchCoffee:[],
				keyword:''
			}
		},
		onLoad() {
			this.search()
		},
		methods: {
			search(searchName){
			    uni.request({
					url:'http://www.kangliuyong.com:10002/search',
					data:{
						appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
						name:searchName,
					},
					success:(res) => {
						console.log("收到开发者服务器，成功返回的回调函数 res=>",res)//商品信息
						this.searchCoffee=res.data.result 
					}      
			    }) 
			},
			//方法二：点击商品去往商品详情列表
			gotoDetailsPage(pid ,type){
				console.log('pid=>',pid)
				console.log('type=>',type)
				uni.navigateTo({
					url: '../productDetail/productDetail?id='+pid
				});
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
			back(){
				if (window.history.length <= 1) {
					this.$router.push({path:'/'})
					return false
				} else {
					this.$router.go(-1)
				}
			},
		},
		
		watch:{
			keyword(val){
				immediate:true
				this.search(val)
			}
		},
}
</script>

<style>
	.menu{
		
		display: flex;
		background-color: #fff;
		flex-direction:column;
		justify-content:space-between;
	}
	.menu_switch button{
		background-color: #fbfbfb;
		width: 19%;
		display: flex;
		padding: 0;
		flex-direction: column;
	}
	.menu_switch ul span{
	 display: block;
	
	}
	
/* 搜索栏 */
	.topnav{
		display: flex;
	}
	.details-return{
		margin-top: 20rpx;
		margin-left: 10rpx;
		display: block;
		width: 100rpx;
		height: 60rpx;
		border: 1px rgb(204, 204, 204) solid;
		line-height: 60rpx;
		border-radius: 30%;
	}
	.search{
		
		width: 80%;
		display: flex;
		background-color: #fff;
		margin-left: 20px;
		padding: 10px;
	}

/* 搜索栏-end */

.grid_{
	display: flex;
}
/* sitch部分 */
ul{
	width: 98%;
	display: flex;
	padding: 5px;

}
.bu_title{
	
}
li{
	display: flex;
	flex-direction: column;
	list-style: none;
	width: 19%;
	align-items: center;
	justify-content: space-between;
}
/* sitch部分-end */

/* 商品列表 */

.recomend_show{
		display: flex;
		padding-top: 0.625rem;
		flex-wrap: wrap;
		justify-content: center;
		
	}

.shopping_list_all{
	width: 100%;
	background-color: #f5f5f5;
	
	box-sizing: border-box;
	
	/* text-align: center; */
	margin-top: 5px;
	align-items: center;
	display: flex;
	justify-content: center;
}

.shopping_picture {
		width: 25%;

		position: relative;
		
	}

.shopping_picture_show{
		width: 100%;
		border-radius: 25%;
	}


.shopping_price{
	width: 20%;
	color: #00006b;
	font-weight: 800;
}
.ch_en_name{
	width: 51%;
	padding-left: 2%;
	font-size: 16px;
	color: #696969;
}
.shopping_enname{
	font-size: 10rpx;
	color: #696969;
	text-overflow: ellipsis;
}
.menu_switch ul span{
	font-size: 16px;
	font-weight: 800;
	color: #696969;
}
</style>
