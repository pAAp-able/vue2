<template>
	<view class="big-box">
		<view class="search">
			<u-search  shape="round"  v-model="keyword" :showAction="false" @search="getsearch"></u-search>
		</view>
		<view class="menu">
			<view class="menu-type" :class="isShow?'Show':'noShow'">
				<view class="type-list" v-for="(item,index) in typeList" :key="item.id">
					<view class="type-picture" @click="getProductList(index,item.key,item.type)">
						<image class="picture-show" :src="item.isActive ? item.activeImg : item.img" mode="widthFix"></image>	
					</view>
					<view class="type-name" :class="item.isActive ? 'active' : '' ">{{item.typeDesc}}</view>
				</view>			
			</view>
		</view>
		<view class="menu-product">
			<view class="product-list"  v-for="(item,index) in typeProductList" :key="index" @click="open(item)"> 
				<view class="list-left">
					<image  class="left-picture" :src="item.smallImg  " mode="widthFix"></image>
					<view class="left-name">
						<view class="chinese-name">{{item.name}}</view>
						<view class="english-name">{{item.enname}}</view>
					</view>
				</view>	
				
				<view class="list-right">¥&nbsp;{{item.price}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				isShow:true,
				typeList:[
					{
						img:"../../static/menuIcon/icons_01.png",
						activeImg:"../../static/menuIcon/icons_02.png",
						isActive:false,
						key:"isHot"
					},
					{
						img:"../../static/menuIcon/icons_03.png",
						activeImg:"../../static/menuIcon/icons_04.png",
						isActive:false,
						key:"type"
					},
					{
						img:"../../static/menuIcon/icons_05.png",
						activeImg:"../../static/menuIcon/icons_06.png",
						isActive:false,
						key:"type"
					},
					{
						img:"../../static/menuIcon/icons_07.png",
						activeImg:"../../static/menuIcon/icons_08.png",
						isActive:false,
						key:"type"
					},
					{
						img:"../../static/menuIcon/icons_09.png",
						activeImg:"../../static/menuIcon/icons_10.png",
						isActive:false,
						key:"type"
					}
				],
				typeProductList:[],
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
		created(){
			this.getType();
			this.getProductList(0,"isHot",1);
		},
		methods: {

			getsearch()
			{
				uni.navigateTo({
					url:"../../pages/search/search"
				})
			},
			getType(){
				this.$uni({
					url:"/type"
				}).then(res => {
					console.log("第1次获取商品类似==>", res);
					//创建一个新数据：推荐
					let hot ={
						id:0,
						typeDesc:"推荐",
						type:1
					}
					//把新数据添加到typeList数据的开头 使用unshift()
					res.unshift(hot);
					console.log("第2次获取商品类似==>",res);
					//定义一个新数据
					let arr = [];
					//定义一个空对象
					let obj = {};
					//处理数据
					res.forEach((item,index) => {
						console.log("item==>",item);
						// console.log("index==>",index);
						obj = {
							...item,
							...this.typeList[index]
						}
						//依次向typeList数组尾部添加当前对象的数据
						arr.push(obj);
					})
					console.log("第3次获取商品类似==>",res);
					//对属性typeList赋值
					this.typeList =arr;
					console.log("第4次获取商品类似==>",this.typeList);
					
				})
			},
			getProductList(index,key,value)
			{
				//添加数据 若重复点击某个页面 则不执行发送请求的API
				if(this.typeList[index].isActive)
				{
					return;//终止代码的后续执行
				}
				//请求热卖推荐的商品列表数据
				this.$uni({
					url:'/typeProducts',
					data:{
						key:key,
						value:value,
					}
				}).then(res =>{
					//给新属性赋值
					this.typeProductList = res;
					this.typeProductData = res;
					console.log("当前点击的是类型为: " + value + "  的列表数据为：  ",this.typeProductList);
					//排他思想：大家都不选中
					this.typeList.forEach(item => {
						item.isActive=false;
					})
					this.typeList[index].isActive=true;
				})
			},
			//获取商品详情的第一次种方法
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
			
			//获取商品详情的第二仲方法
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
	.big-box
	{
		height: 1000px;
		background-color: rgb(247, 247, 247);
	}
	.search
	{
		height: 100rpx;
		display: flex;
		text-align: center;
	}
	.u-search
	{
		padding: 0px 20px;
	}
	/deep/.uicon-search span
	{
		color: rgb(12, 32, 218);
	}
	.menu
	{
		position: sticky;
		top: 0;
		z-index: 9999;
	}
	.menu-type
	{
		justify-content: space-evenly;
		text-align: center;
		align-items: baseline;
		padding: 20rpx 0;
		background-color: #fbfafa;

	}
	.Show
	{
		display: flex;
	}
	.noShow
	{
		display: none;
	}
	
	.picture-show
	{
		width: 40px;
	}
	.type-name
	{
		font-weight: bolder;
		font-size: 35rpx;
	}
	.active
	{
		color: #0a33ba;
	}
	.menu-product
	{
		padding-bottom: 50rpx;
		border-top: 1rpx solid transparent;
		background-color:rgb(247, 247, 247);
		
	}
	.product-list
	{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 26rpx;
		margin: 32rpx;
		background-color: #fff;
		border-radius: 10rpx;
	}
	.products-list:last-child{
		margin-bottom: 0;
	}
	.list-left
	{
		display: flex;
		align-items: center;
		flex-basis: 80%;
		position: relative;
	}
	.left-picture
	{
		width: 160rpx;
		min-width: 160rpx;
		margin-right: 20rpx;
		border-radius: 6rpx;
	}
	.left-name
	{
		position: absolute;
		left: 180rpx;
		width: 60%;
		color: #6f6f70;
	}
	.chinese-name,
	.english-name
	{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.english-name
	{
		padding-top: 10rpx;
		font-size: 26rpx;
	}
	.list-right
	{
		flex-basis: 20%;
		min-width: 136rpx;
		font-weight: bold;
		color: #0a33ba;
		font-size: 28rpx;
	}
	uni-page-wrapper::after
	{
		
		background-color:rgb(247, 247, 247);
	}
	
</style>
