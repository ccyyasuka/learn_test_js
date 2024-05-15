const http = require('http');
const server = http.createServer((request, response) => {
	// 实例化url
	// let url = new URL('https://www.baidu.com/search?wd=s');
	// let url = new URL('/search?wd=s', 'https://www.baidu.com');
	let url = new URL(request.url, 'https://www.baidu.com');
	console.log(url.pathname);
	console.log(url.searchParams.get('param1'));
	response.end('Url new'); //设置响应体
});
server.listen(9000, () => {
	console.log('服务已经启动');
});
