// import logo from './logo.svg';
// import './App.css';
import createElement from './createElement.js';
import myRender from './myRender.js';
// import render from './render.js';
// import { useState } from './render.js';
import { useState } from './myRender.js';
// const handleChange = e => {
// 	renderer(e.target.value);
// };

const container = document.querySelector('#root');

// const renderer = value => {
// 	console.log(1);
// 	const element = createElement(
// 		'div',
// 		null,
// 		createElement('input', {
// 			value: value,
// 			oninput: e => {
// 				handleChange(e);
// 			},
// 		}),
// 		createElement('h2', null, value)
// 	);

// 	myRender(element, container);
// };
// renderer('Hello');

// const App = props => {
// 	return createElement('h1', null, 'Hi', props.name);
// };
// const element = createElement(App, { name: 'Tom' });
// myRender(element, container);

const Counter = () => {
	const [state, setState] = useState(1);
	return createElement('h1', { onclick: () => setState(prev => prev + 1) }, state);
};

const element = createElement(Counter);
// render(element, container);
myRender(element, container);
