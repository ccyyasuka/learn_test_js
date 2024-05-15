const http = require('http');

const server = http.createServer((request, response) => {
	// 声明一个变量
	let body = '';
	// 绑定事件
	// request是一个请求流对象
	request.on('data', chunk => {
		body += chunk;
	});
	// 请求流对象读取完了，开始执行end
	request.on('end', () => {
		console.log(body);
	});

	response.end('Hello HTTP Server'); //设置响应体
});
server.listen(9000, () => {
	console.log('服务已经启动');
});
