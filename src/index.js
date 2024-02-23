import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import List_func from './list_func';
import MultiClick from './multiClick';
import Js_func from './js_func';
import Prototype from './prototype';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
		{/* <List_func></List_func>
		<MultiClick></MultiClick> */}
		<Prototype></Prototype>
		<Js_func></Js_func>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
