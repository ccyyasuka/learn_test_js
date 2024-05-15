const fs = require('fs');
fs.writeFile('../otherData/座右铭.txt', '三人行', err => {
	//回调函数，如果没错，err为空
	console.log('writeFile');
	if (err) {
		console.log(err);
		return;
	}
	console.log('写入成功');
});
// 追加写入
fs.appendFile('../otherData/座右铭.txt', '，必有我师\n择其善者而从之', err => {
	//回调函数，如果没错，err为空
	console.log('appendFile');
	if (err) {
		console.log(err);
		return;
	}
	console.log('追加写入成功');
});
// writeFile是异步的
console.log('外部');
