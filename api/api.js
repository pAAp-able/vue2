// 定义一个变量计数
let ajaxNumber = 0;
const request = obj =>
{
	// 计数自增(+1)
	ajaxNumber++;
	// 定义一个公共的URL
	const baseUrl = 'http://www.kangliuyong.com:10002';
	return new Promise((resolve, reject) => {
		// 开启Loading
		uni.showLoading({
			title:"正在加载中.."
		})
		//开始发送网络请求
		uni.request({
			...obj, //es6的展开运算符
			url:baseUrl+obj.url,//开发者服务器的接口地址
			//请求参数
			data:{
				appkey:"U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
				...obj.data
	
			},
			success:(res) => { //成功返回参数
				resolve(res.data.result);//赋值
				ajaxNumber--;
				if(ajaxNumber == 0) //判断是否全都请求完成
				{
					setTimeout(()=> { //设置延时定时器
						uni.hideLoading(); //关闭加载提升
					},1000) //1000ms = 1s
				}
				
			}
			
		})
	})
}
//导出数据
export default {
	request
}	