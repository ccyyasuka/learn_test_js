const fs = require('fs');
fs.readFile('../otherData/一首诗.txt', (err, data) => {
	if (err) {
		console.log(err);
		return;
	}
	// data是一个buffer
	console.log(data.toString());
});
