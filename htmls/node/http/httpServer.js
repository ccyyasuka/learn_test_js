const http = require('http');

const server = http.createServer((request, response) => {
	// request是请求报文的封装对象
	// response是响应报文的封装
	// 服务端每次接收到http请求时，执行这个回调函数
	//设置响应头content-type=text/html;charset=utf-8
	response.setHeader('content-type', 'text/html;charset=utf-8');
	response.end('Hello HTTP Server 你好'); //设置响应体
});
server.listen(9000, () => {
	// 服务启动时才执行
	console.log('服务已经启动');
});
