<template>
	<view class="register">
		<h1 class="register-title" style="text-align: center;">
			注册页面
		</h1>
		<u--form  class="register-form" :model="register">
			<u-form-item label="账号">
				<!-- v-model指令 数据双向绑定 限制在input select textarea 这几个组件使用 -->
				<u--input type="text" placeholder="请输入你的账号名..." v-model="register.phone"></u--input>
			</u-form-item>
			<u-form-item label="昵称">
				<u--input type="text" placeholder="请输入你的昵称..." v-model="register.nickname"></u--input>
			</u-form-item>
			<u-form-item label="密码">
				<!-- <u--input type="password" placeholder="请输入你的密码..."></u--input> -->
				<u--input type="text" placeholder="必须英文数字混合,且在6~16位之间" v-model="register.password"></u--input>
			</u-form-item>
		</u--form>
		<view class="btns">
			<u-button type="primary" shape="circle" text="注册" @click="submit"></u-button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 注册信息
				// 对象.属性 = 属性值
				register: {
					phone: "",//存放注册账号
					nickName:"",//存放注册昵称
					password:"",//存放注册密码
				}
			}
		},
		methods: {
			
			//定义一个方法，点击该方法，跳转到指定界面
			// gotologin(){
			// 	uni.navigateTo({
			// 		url:"/pages/login/login"
			// 	})
			// }
			//按钮中添加事件@click="gotologin"调用此方法
			
			//定义一个方法，进行表单中的数据验证
			submit(){
				//验证账号 正则表达式
				//^符号表示开始，$表示结束，规定账号以1开头，第二位从3到9，第三位为任意九个数字，总共十一位
				let regphone = /^1[3-9]\d{9}$/;
				//test()判断是否符合正则表达式，符合返回return true
					if(!regphone.test(this.register.phone)||this.register.phone==""){
						//提示错误
						uni.showToast({
						title:"账号输入格式有误！",
						icon:"error",
						})
						return;
					} 
				//验证昵称 中英文混合 至少2位至多10位
				let regnickname = /^[\u4e00-\u9fa5_a-zA-Z0-9]{2,10}$/;
					if(!regnickname.test(this.register.nickname)||this.register.nickname==""){
						//提示错误
						uni.showToast({
						title:"昵称输入格式有误！",
						icon:"error",
						})
						return;
					} 
				//验证密码
				let regpassword = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*()_.]+)$)^[\w~!@#$%^&*()_.]{6,16}$/;
					if(!regpassword.test(this.register.password)||this.register.password==""){
						//提示错误
						uni.showToast({
						title:"密码输入格式有误！",
						icon:"error",
						})
						return;
					}
				
				//开始使用注册接口
				uni.request({
					method:'POST',
					url:"http://www.kangliuyong.com:10002/register",
					data:{
						    appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
						    nickName: this.register.nickname,
						    password: this.register.password,
						    phone: this.register.phone
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
					},
					success:(res)=> {
						console.log("收到开发者服务器成功返回的回调函数",res);
						console.log("检测到注册信息是否得到this.register=>",this.register);
						
						//以账号为键，密码为值，数据保存在本地
						//localStorage.setItem(this.register.phone,JSON.stringify(this.register.password));
						
						//以账号为键，账号密码昵称为值，数据保存在本地
						//localStorage.setItem(this.register.phone,JSON.stringify(this.register));
						
						localStorage.registerInfo=JSON.stringify(this.register)
						// console.log("收到开发者",localStorage.getItem(this.register.phone));
					}
				})
				uni.navigateTo({
					url:"../../pages/login/login"
				})
			}
		}
	}
</script>

<style>
	.btns{
		width: 260px;
		margin: 10px auto;
	}
</style>
