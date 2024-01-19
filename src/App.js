import logo from './logo.svg';
import './App.css';

function App() {
	function clone(target, map = new Map()) {
		// debugger;
		if (typeof target === 'object') {
			let res = Array.isArray(target) ? [] : {};
			if (map.get(target)) {
				return map.get(target);
			}
			map.set(target, res);
			for (const key in target) {
				res[key] = clone(target[key], map);
			}
			return res;
		}
		return target;
	}
	const target = {
		field3: {
			child: 'child',
		},
		field4: [2, 4, 8],
	};
	target.target = target;
	const res = clone(target);
	console.log(res);
	return <div />;
}

export default App;
