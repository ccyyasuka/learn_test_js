const http = require('http');

const server = http.createServer((request, response) => {
	// 获取request中的请求方法
	console.log(request.method);
	console.log(request.url); //只包含url中的路径和查询字符串
	console.log(request.headers); //headers是一个对象
	console.log(request.headers.host);
	console.log(request.headers['accept-language']);
	response.end('Hello HTTP Server'); //设置响应体
});
server.listen(9000, () => {
	console.log('服务已经启动');
});
