function Js_func() {
	class People {
		constructor(name) {
			this.name = name;
		}
		sayHello() {
			console.log('hello');
		}
	}
	class Student extends People {
		constructor(name, grade) {
			super(name);
			this.grade = grade;
		}
		sayHello() {
			super.sayHello(); //调用父类方法
			console.log('hellohello');
		}
	}
	function police() {
		//也可以声明类
	}

	console.log(typeof 974823n); //symbol
	console.log(typeof Symbol(12)); // bigint
	console.log(typeof undefined); // undefined
	console.log(typeof 2); // number
	console.log(typeof true); // boolean
	console.log(typeof 'str'); // string
	console.log(typeof function () {}); //function
	console.log(typeof [1, 3, 4]); //object
	console.log(typeof {}); //object
	console.log(typeof null); //object

	let Allen = new Student('allen', 100);
	console.log(Allen instanceof People); //其内部运行机制是判断在其原型链中能否找到该类型的原型
	console.log([] instanceof Array); //true
	console.log({} instanceof Object); //true
	console.log(null instanceof Object); //false null不是任何类的构造函数构造的实例

	console.log(Object.prototype.toString.call([1, 2, 3])); //[Object Array] 原型链

	console.log([1, 2, 3].__proto__ === Array.prototype); //true
	console.log(Array.isArray([1, 2, 3])); //true
	//以上是四种判断列表的方法

	console.log(Allen.__proto__ === Student.prototype); //t
	console.log(Allen.__proto__ === People.prototype); //f
	console.log(Allen.__proto__.__proto__ === People.prototype); //t
	console.log(Allen.__proto__ === People.prototype.prototype); //f

	return <div></div>;
}
export default Js_func;
