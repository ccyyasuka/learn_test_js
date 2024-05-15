// 在读写大文件时，stream可以读一点写一点，内存只占用64KB
// readFile就会一口气全读进来，占用内存过大
const fs = require('fs');
const rs = fs.createReadStream('../otherData/一首诗.txt');
// 绑定data事件
rs.on('data', chunk => {
	// 当从文件中读出来一块数据就执行回调函数
	console.log(chunk.toString());
	// 每次最多读65536 也就是64KB
	console.log(chunk.length);
});
rs.on('end', () => {
	console.log('读取完成');
});
console.log(-1 % 3);
