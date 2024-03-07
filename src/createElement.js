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
