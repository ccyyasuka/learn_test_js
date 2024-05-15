const fs = require('fs');
// 创建了一个流，可以随时往里面写入
const ws = fs.createWriteStream('../otherData/一首诗.txt');
ws.write('此去泉台招旧部\n');
ws.write('旌旗十万斩阎罗');
ws.close();
