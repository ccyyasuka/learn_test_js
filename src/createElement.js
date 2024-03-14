function createTextElement(text) {
	return {
		type: 'TEXT_ELEMENT',
		props: {
			nodeValue: text,
			children: [],
		},
	};
}
function createElement(type, props, ...children) {
	//这样传进来的children本就是一个数组了
	//函数式组件传进来，type是一个函数，props和children都为空
	// console.log(type, props, children);
	let res = {
		type,
		props: {
			...props,
			children: children.map(child => (typeof child === 'object' ? child : createTextElement(child))),
		},
	};
	return res;
}
export default createElement;
