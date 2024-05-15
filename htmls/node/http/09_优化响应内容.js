const http = require('http');
const fs = require('fs');
const server = http.createServer((request, response) => {
	let html = fs.readFileSync(__dirname + '/10_table.html');
	//readFileSync是同步的，readFile是异步的
	response.end(html); //设置响应体
});
server.listen(9000, () => {
	console.log('服务已经启动');
});
