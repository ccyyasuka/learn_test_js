import logo from './logo.svg';
function compare(value1, value2) {
	if (value1 < value2) return -1;
	if (value1 > value2) return 1;
	else return 0;
}
// 如果 value1 小于 value2，函数返回 -1。这意味着 value1 应该在 value2 之前。
// 如果 value1 大于 value2，函数返回 1。这意味着 value1 应该在 value2 之后。
// 如果两者相等，返回 0。这意味着两者的顺序保持不变。
function List_func() {
	let list1 = [1, 2, 3, 4];
	//toString "1, 2, 3, 4"
	let res = list1.toString();
	console.log(res);

	// join操作 是string.split的逆操作
	let list2 = [1, 2, 3, 4, 5];
	console.log(list2.join());
	console.log(list2.join('-'));
	let list3 = new Array(10);
	console.log(list3.join('*')); //9个连续的*

	// reverse 数组逆序排列
	let list4 = [1, 3, 's', true];
	console.log(list4, list4.reverse()); //在这个位置，先执行log()中的各个部分，再执行log，所以list4和list是一样的
	let list4Copy = [...list4]; // 创建 list4 的副本
	console.log(list4Copy.reverse()); // 逆序副本，不影响原数组 list4
	console.log(list4); // 原数组保持不变
	list4Copy[3] = 9;
	console.log(list4);
	// [...list4] 这一操作进行数组复制实际上是一种浅拷贝（shallow copy），而不是深拷贝（deep copy）。这意味着这个操作只有数组的第一层元素有深拷贝的效果。

	//sort 排序
	let list5 = ['aaa', 'bab', 'aba', 'baa'];
	console.log(list5.sort());
	let list6 = [36, 5, 2, 1, 9];
	console.log(list6.sort()); //sort是根据字符串顺序进行排序，不适合数字排序
	console.log(list6.sort((a, b) => a - b));
	let list7 = [36, '5', 2, 1, 9];
	console.log(list7.sort(compare)); //自定义排序函数

	//concat
	let list8 = [36, '5', 2, 1, 9];
	console.log(list8, list8.concat(3, 9));
	console.log(list8, list8.concat([9, 9]));

	//slice
	let list9 = [36, 11, 2, 1, 9];
	console.log(list9, list9.slice(2)); //原始list9不会被改变[2:]
	console.log(list9.slice(-3)); //[length-3:]=[2:]
	console.log(list9.slice(1, -3)); //[1:length-3]=[1:2]
	console.log(list9.slice(2, 1)); //[] 注意这两个的区别

	//reduce
	const items = [
		{ name: 'Apple', quantity: 2 },
		{ name: 'Banana', quantity: 5 },
		{ name: 'Orange', quantity: 3 },
	];

	const totalQuantity = items.reduce(function (accumulator, item) {
		if (item.name === 'Apple') return accumulator;
		return accumulator + item.quantity;
	}, 0); //传入回调函数和初始值0

	console.log(totalQuantity); // 输出：10

	//map
	let list10 = [36, 11, 2, 1, 9];
	console.log(list10.map((item, index, array) => item * item + index + array.length));

	//forEach 相较于map没有返回值
	let list11 = [36, 11, 2, 1, 9];
	console.log(
		list10.forEach((item, index, array) => {
			console.log(item * item + index + array.length);
		})
	);

	// filter
	const numbers1 = [1, 2, 3, 4, 5, 6];
	const evenNumbers = numbers1.filter(item => item % 2 === 0);
	console.log(evenNumbers); // 输出: [2, 4, 6]

	// 某元素通过测试
	const numbers2 = [1, 2, 3, 4, 5, 6];
	const hasEvenNumber = numbers2.some(item => item % 2 === 0);
	console.log(hasEvenNumber); // 输出: true

	// 所有元素通过测试
	const numbers3 = [1, 2, 3, 4, 5, 6];
	const allEvenNumbers = numbers3.every(item => item % 2 === 0);
	console.log(allEvenNumbers); // 输出: false

	return <div />;
}

export default List_func;
