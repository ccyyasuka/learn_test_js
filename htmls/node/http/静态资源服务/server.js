const http = require('http');
const fs = require('fs');
const path = require('path');
// const server = http.createServer((request, response) => {
// 	// 网页引入外部资源不能这样处理，因为请求css、js文件时，也会执行这个回调函数，返回一个html
// 	let html = fs.readFileSync(__dirname + '/10_table.html');
// 	response.end(html); //设置响应体
// });
const server = http.createServer((request, response) => {
	// 获取请求url的路径
	let { pathname } = new URL(request.url, 'https://www.baidu.com');
	console.log(pathname);
	if (pathname === '/') {
		let html = fs.readFileSync(__dirname + '/10_table.html');
		response.end(html); //设置响应体
	} else if (pathname === '/index.css') {
		let css = fs.readFileSync(__dirname + '/index.css');
		response.end(css); //设置响应体
	} else if (pathname === '/index.js') {
		let js = fs.readFileSync(__dirname + '/index.js');
		response.end(js); //设置响应体
	} else {
		response.statusCode = 404;
		response.end('<h1>404 Not Found</h1>');
	}
	//

	// //readFileSync是同步的，readFile是异步的
	// response.end('url'); //设置响应体
});
server.listen(9000, () => {
	console.log('服务已经启动');
});
