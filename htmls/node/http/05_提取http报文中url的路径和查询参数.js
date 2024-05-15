const http = require('http');
const url = require('url'); //解析url的模块
const server = http.createServer((request, response) => {
	console.log(request.url); //这里是一个字符串/search?param1=01
	// 第二个参数为true会把request.url解析为对象
	let res = url.parse(request.url, true);
	// console.log('res', res);
	// 路径
	console.log(res.pathname);
	// 参数
	console.log(res.query.param1);
	response.end('Url'); //设置响应体
});
server.listen(9000, () => {
	console.log('服务已经启动');
});
