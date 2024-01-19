import logo from './logo.svg';
function compare(value1, value2) {
	if (value1 < value2) return -1;
	if (value1 > value2) return 1;
	else return 0;
}
// 如果 value1 小于 value2，函数返回 -1。这意味着 value1 应该在 value2 之前。
// 如果 value1 大于 value2，函数返回 1。这意味着 value1 应该在 value2 之后。
// 如果两者相等，返回 0。这意味着两者的顺序保持不变。
function MultiClick() {
	let count = 0;

	// 模拟ajax请求，以随机时间返回一个比之前大一的自然数
	const mockAjax = async () => {
		console.warn('send ajax');
		await new Promise((res, rej) => setTimeout(() => res(++count), Math.random() * 3000));
		console.warn('ajax return');
		return count;
	};
	// document.querySelector('#sendAjax').addEventListener('click', async () => {
	// 	const result = await mockAjax();
	// 	console.log(result);
	// });
	const PromiseExecutor = class {
		constructor() {
			// lazy promise队列
			this._queue = [];

			// 一个变量锁，如果当前有正在执行的lazy promise，就等待
			this._isBusy = false;
		}

		each(callback) {
			this._callback = callback;
		}

		// 通过isBusy实现加锁
		// 如果当前有任务正在执行，就返回，否则就按队列中任务的顺序来执行
		add(lazyPromise) {
			this._queue.push(lazyPromise);

			if (this._isBusy) {
				return;
			}

			this._isBusy = true;

			// execute是一个async函数，执行后立即返回，返回一个promise
			// 因此，add可以在execute内的promise resolved之前再次执行
			this.execute();
		}

		async execute() {
			// 按队列中的任务顺序来依次执行
			while (this._queue.length !== 0) {
				const head = this._queue.shift();
				const value = await head();
				this._callback && this._callback(value);
			}

			// 执行完之后，解锁
			this._isBusy = false;
		}
	};
	const executor = new PromiseExecutor();

	document.querySelector('#sendAjax').addEventListener('click', () => {
		// 添加一个lazy promise
		executor.add(() => mockAjax());
	});

	// 注册回调，该回调会按lazy promise的加入顺序，逐个获取它们resolved的值
	executor.each(v => {
		console.log(v);
	});
	return (
		<div>
			<input id="sendAjax" type="button" value="Click" />
		</div>
	);
}

export default MultiClick;
