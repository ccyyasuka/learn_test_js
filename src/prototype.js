function Prototype() {
	function Person() {}
	Person.prototype.grade = 100;
	let a = new Person();
	let b = new Person();
	console.log(a.grade);
	console.log(Person);

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
	let Allen = new Student('Allen', 90);

	console.log(Allen.__proto__ === Student.prototype); //t
	console.log(Allen.__proto__ === People.prototype); //f
	console.log(Allen.__proto__.__proto__ === People.prototype); //t Allen.__proto__查看直接原型
	console.log(Allen.__proto__ === People.prototype.prototype); //f People.prototype是实例原型 原型对象没有prototype方法，构造函数才有prototype方法

	console.log(People.prototype.constructor === People);//constructor从实例原型指向构造函数
	return <div></div>;
}
export default Prototype;
