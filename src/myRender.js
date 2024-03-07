// step2: render函数
// render接收一个react的Element和一个现实存在的dom，进行渲染
// 递归调用，无法中断，被淘汰的render
// let root = document.querySelector('#root');
// function render(element, container) {
// 	console.log(element);
// 	const dom =
// 		element.type === 'TEXT_ELEMENT'
// 			? document.createTextNode('')
// 			: document.createElement(element.type); //创建一个dom节点
// 	//赋予属性
// 	Object.keys(element.props)
// 		.filter(key => key !== 'children') //把props中所有除了children的属性保留下来
// 		.forEach(key => (dom[key] = element.props[key])); //把属性依次赋值给dom
// 	element.props.children.forEach(child => {
// 		render(child, dom);
// 	}); //递归调用，把孩子渲染在当前节点
// 	container.appendChild(dom);
// }
// render(element_res, root);

// 初始化操作全部写在这里
function myRender(element, container) {
	// nextUnitOfWork = {
	// 	dom: container,
	// 	props: {
	// 		children: [element],
	// 	},
	// 	sibling: null,
	// 	child: null,
	// 	parent: null,
	// }; //这就是一个初始化的fiber
	wipRoot = {
		//workingInProgressRoot
		// 标识render是否已经结束，是否可以进入commit
		dom: container,
		props: {
			children: [element],
		},
		alternate: currentRoot, //备份，存储上次渲染的wipRoot的引用
		//diff算法中每一个fiber都基于alternate取到上一个fiber
	};
	nextUnitOfWork = wipRoot;
	deletions = [];
}
function createDom(fiber) {
	// 根据fiber的type决定我们创建什么dom
	const dom = fiber.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(fiber.type); //创建一个dom节点
	//赋予属性
	Object.keys(fiber.props)
		.filter(key => key !== 'children') //把props中所有除了children的属性保留下来
		.forEach(key => (dom[key] = fiber.props[key])); //把属性依次赋值给dom
	return dom;
}
//commit阶段 异步渲染构建fiber树结束，同步commit开始
function commitRoot() {
	deletions.forEach(commitRoot); //删除所有要删除的fiber
	commitWork(wipRoot.child);
	currentRoot = wipRoot; //保存上次的fiber树的引用
	wipRoot = null;
}
//递归，让整个树显示在屏幕上
function commitWork(fiber) {
	if (!fiber) {
		return;
	}
	//函数式组件没有自己的dom，所以需要循环向上查找，找到最近的存在dom的fiber节点，针对节点更新要向上查找
	let domParentFiber = fiber.parent;
	while (!domParentFiber.dom) {
		domParentFiber = domParentFiber.parent;
	}

	const parentDom = domParentFiber.dom;
	if (fiber.effectTag === 'PLACEMENT' && fiber.dom) {
		parentDom.appendChild(fiber.dom);
	} else if (fiber.effectTag === 'DELETION' && fiber.dom) {
		//针对函数式组件的删除操作比较复杂，要查找到离函数式组件最近的子节点
		commitDeletion(fiber, parentDom);
		//非函数式组件可以只用这一句话
		// parentDom.removeChild(fiber.dom);
	} else if (fiber.effectTag === 'UPDATE' && fiber.dom) {
		updateDom(fiber.dom, fiber.alternate.props, fiber.props);
	}
	// parentDom.append(fiber.dom); //把当前dom挂在parent dom上，从而真的显示在屏幕上,
	// 有了这句代码，diff会变卡顿，为什么？？？
	commitWork(fiber.child);
	commitWork(fiber.sibling);
}
function commitDeletion(fiber, domParent) {
	if (fiber.dom) {
		//普通组件，fiber有dom
		domParent.removeChild(fiber.dom);
	} else {
		//递归向下查找，子fiber的dom是挂在domParent的
		commitDeletion(fiber.child, domParent);
	}
}
function updateDom(dom, prevProps, nextProps) {
	//删除nextProps已经没有的props
	Object.keys(prevProps) //只检查前后的props差别
		.filter(key => key !== 'children' && !key.startsWith('on')) //children是保存子元素的props
		.filter(key => !key in nextProps) //只留下nextProps不存在的props中的key
		.forEach(key => {
			dom[key] = '';
		});
	Object.keys(nextProps)
		.filter(key => key !== 'children' && !key.startsWith('on')) //没有!key.startsWith('on')会每次触发两个事件，很奇怪
		.filter(key => !key in prevProps || prevProps[key] !== nextProps[key])
		//只留下prevProps不存在的key或前后不一致的key
		.forEach(key => {
			dom[key] = nextProps[key];
		});

	//删除已经没有的或者发生变化的事件处理函数
	Object.keys(prevProps)
		.filter(key => key.startsWith('on')) //判断是否是事件处理函数
		.filter(key => !(key in nextProps) || prevProps[key] !== nextProps[key])
		.forEach(key => {
			const eventType = key.toLowerCase().substring(2);
			dom.removeEventListener(eventType, prevProps[key]);
		});
	//添加已经没有的或者发生变化的事件处理函数
	Object.keys(nextProps)
		.filter(key => key.startsWith('on'))
		.filter(key => !(key in nextProps) || prevProps[key] !== nextProps[key])
		.forEach(key => {
			const eventType = key.toLowerCase().substring(2);
			dom.addEventListener(eventType, nextProps[key]);
		});
}

// function reconcileChildren(wipFiber, elements) {
// 	let index = 0;
// 	// oldFiber是旧的wipFiber的第一个child
// 	let oldFiber = wipFiber.alternate ? wipFiber.alternate.children : null;

// 	let preSibling = null;
// 	//新老两个fiber对应的节点数目未必相等
// 	while (index < elements.length || oldFiber !== null) {
// 		const element = elements[index]; //element还不是fiber，所以可以直接访问
// 		let newFiber = null;
// 		// 情况1 如果element和oldFiber都存在且type相等，这个时候只更新props就行
// 		const sameType = element && oldFiber && element.type === oldFiber.type;

// 		if (sameType) {
// 			//更新props
// 			newFiber = {
// 				type: oldFiber.type,
// 				props: element.props,
// 				dom: oldFiber.dom, //继承上次的dom
// 				parent: wipFiber,
// 				alternate: oldFiber,
// 				effectTag: 'UPDATE', //记录diff的类型
// 			};
// 		}
// 		if (element && !sameType) {
// 			// 新建
// 			// 只有新节点没有旧节点
// 			newFiber = {
// 				type: element.type,
// 				props: element.props,
// 				dom: null,
// 				parent: wipFiber,
// 				alternate: null,
// 				effectTag: 'PLACEMENT',
// 			};
// 		}
// 		if (oldFiber && !sameType) {
// 			// 删除
// 			// 只有旧节点没有新节点
// 			oldFiber.effectTag = 'DELETION';
// 			deletions.push(oldFiber); //记录所有要删除的fiber
// 		}
// 		// 没法通过遍历取到旧的wipFiber的所有孩子，所以用sibling取到oldFiber的所有兄弟
// 		if (oldFiber) {
// 			oldFiber = oldFiber.sibling;
// 		}

// 		// 构建fiber树
// 		if (index === 0) {
// 			wipFiber.child = newFiber;
// 		} else {
// 			preSibling.sibling = newFiber;
// 		}
// 		preSibling = newFiber;
// 		index += 1;
// 	}
// }

function reconcileChildren(wipFiber, elements) {
	let index = 0;
	// 如果有alternate，就返回它的child，没有，就返回undefined
	let oldFiber = wipFiber.alternate && wipFiber.alternate.child;

	let prevSibling = null;

	// 注意这里是或
	while (index < elements.length || oldFiber) {
		const element = elements[index];
		const sameType = oldFiber && element && oldFiber.type === element.type;

		let newFiber = null;

		if (sameType) {
			// 更新
			newFiber = {
				type: oldFiber.type,
				props: element.props,
				// 继承dom
				dom: oldFiber.dom,
				parent: wipFiber,
				alternate: oldFiber,
				effectTag: 'UPDATE',
			};
		}
		if (element && !sameType) {
			// 新建
			newFiber = {
				type: element.type,
				props: element.props,
				dom: null,
				parent: wipFiber,
				alternate: null,
				effectTag: 'PLACEMENT',
			};
		}
		if (oldFiber && !sameType) {
			// 删除
			oldFiber.effectTag = 'DELETION';
			deletions.push(oldFiber);
		}

		if (oldFiber) {
			// 下一个oldFiber
			oldFiber = oldFiber.sibling;
		}

		// 第一个child才可以作为child，其他的就是sibling
		if (index === 0) {
			wipFiber.child = newFiber;
		} else {
			prevSibling.sibling = newFiber;
		}
		prevSibling = newFiber;
		index++;
	}
}

// //第一次请求
// requestIdleCallback(WorkLoop);

//fiber的作用就是为了快速找到下一个UnitOfWork
// step1. 给fiber渲染一个新dom
// step2: 根据children创建若干新fiber,构建fiber链表
// step3:返回nextUnitOfWork
function performUnitOfWork(fiber) {
	// step1. 给fiber渲染一个新dom 放在了updateHostComponent(fiber)里
	// if (!fiber.dom) {
	// 	fiber.dom = createDom(fiber);
	// }
	//判断是否是函数式组件
	const isFunctionComponent = fiber.type instanceof Function;
	if (isFunctionComponent) {
		updateFunctionComponent(fiber);
	} else {
		updateHostComponent(fiber);
	}

	// if (fiber.parent) {
	// 	//fiber.parent.dom是document.createElement创造出来的真实dom
	// 	//操作浏览器的DOM树，将新创建的DOM元素作为子元素添加到其父元素中，从而显示在屏幕上
	// 	// performUnitOfWork中执行这一步时不安全的，因为是异步调用的，
	// 	// 浏览器可能打断调用过程导致只渲染了一半
	// 	fiber.parent.dom.append(fiber.dom);
	// }

	//step2: 根据children创建若干新fiber,构建fiber树

	// diff算法的核心，就是在reconcileChildren优化newFiber的构建过程
	// 接收fiber和它所有的child
	// 创建新fiber,构建fiber树
	// 放在了updateHostComponent
	// const elements = fiber.props.children;
	// reconcileChildren(fiber, elements);

	let preSibling = null;
	// 以下是创建fiber相关代码，被reconcileChildren优化了

	// 构建新fiber节点
	// for (let i = 0; i < elements.length; i += 1) {
	// 	const curFiber = {
	// 		type: elements[i].type,
	// 		props: elements[i].props,
	// 		parent: fiber,
	// 		dom: null,
	// 		sibling: null,
	// 		child: null,
	// 	};
	// 构建fiber树
	// 	if (i === 0) {
	// 		fiber.child = curFiber;
	// 	} else {
	// 		preSibling.sibling = curFiber;
	// 	}
	// 	preSibling = curFiber;
	// }

	//step3:返回nextUnitOfWork
	if (fiber.child) {
		return fiber.child;
	}
	let nextFiber = fiber;
	//当前fiber渲染完了，且当前fiber子元素，从这里去找到fiber的父节点的兄弟节点，
	//如果找不到就一路向上，直到root_fiber的父节点也就是null
	while (nextFiber) {
		if (nextFiber.sibling) {
			return nextFiber.sibling;
		}
		nextFiber = nextFiber.parent;
	}
}
//记住上一次的fiber,为hook做基础，和reconcileChildren的wipFiber不同
let wipFiber = null;
let hookIndex = 0;
//处理函数式组件
function updateFunctionComponent(fiber) {
	wipFiber = fiber;
	hookIndex = 0;
	wipFiber.hooks = []; //储存当前组件注册的所有hook，fiber同时也有了hoo  ks

	//函数式组件的children是通过运行而来的
	//也就是函数返回的jsx是函数式组件的孩子，函数式组件没有自己的dom节点,返回的jsx是他孩子的dom
	const children = [fiber.type(fiber.props)];
	reconcileChildren(fiber, children);
}

export function useState(init) {
	// hook用来连接前后两次渲染，必须有全局变量来记录上一次渲染的信息，也就是wipFiber
	const oldHook = wipFiber.alternate?.hooks[hookIndex];
	const hook = {
		state: oldHook ? oldHook.state : init,
		queue: [],
	};
	//外部通过setState更新了hook.queue，里面充满了prev => prev + 1之类的函数
	const actions = oldHook ? oldHook.queue : [];
	// 遍历queue，用函数（也叫action）的返回值更新state
	actions.forEach(action => {
		hook.state = action(hook.state);
	});
	const setState = function (action) {
		hook.queue.push(action);
		//和render的操作基本一致，进行初始化，设置nextUnitOfWork，触发下一轮渲染
		wipRoot = {
			//currentRoot是上次渲染的fiber树
			dom: currentRoot.dom,
			props: currentRoot.props,
			alternate: currentRoot,
		};
		nextUnitOfWork = wipRoot;
		deletions = [];
	};
	wipFiber.hooks.push(hook);
	hookIndex += 1;
	return [hook.state, setState];
}

//处理非函数式组件
function updateHostComponent(fiber) {
	if (!fiber.dom) {
		fiber.dom = createDom(fiber);
	}
	// diff算法的核心，就是在reconcileChildren优化newFiber的构建过程
	// 接收fiber和它所有的child
	// 创建新fiber,构建fiber树
	const elements = fiber.props.children;
	reconcileChildren(fiber, elements);
}

let nextUnitOfWork = null; //是否有下一个任务
let wipRoot = null;
//第一次请求
requestIdleCallback(WorkLoop);
let currentRoot = null; //进行diff算法时存储上一棵树
let deletions = null; //储存要删除的节点

function WorkLoop(deadline) {
	let shouldYield = false; //是否应该暂停
	while (nextUnitOfWork && !shouldYield) {
		// console.log('deadline', deadline);
		nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
		//做工作，执行当前工作，返回下一个工作
		shouldYield = deadline.timeRemaining() < 1;
		//deadline.timeRemaining()返回浏览器给当前任务剩了多少时间，时间小于一毫秒就该暂停了
	}

	if (wipRoot && !nextUnitOfWork) {
		//说明构建fiber树已经结束了，该进入commit阶段了
		commitRoot();
	}

	//requestIdleCallback指浏览器调用栈为空时执行这个任务
	// 递归调用没法异步，当前方法是把任务拆成若干个小任务，再用requestIdleCallback执行这个任务
	requestIdleCallback(WorkLoop);
}

export default myRender;
