const http = require('http');
const server = http.createServer((request, response) => {
	//设置响应状态码
	response.statusCode = 203;
	// 响应状态的描述
	response.statusMessage = 'what can i say';
	// 响应头
	response.setHeader('content-type', 'text/html;charset=utf-8');
	response.setHeader('Server', 'Node.js');
	//设置响应体
	response.write('love ');
	response.write('you');
	response.end('');
});
server.listen(9000, () => {
	console.log('服务已经启动');
});
