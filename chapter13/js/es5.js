'use strict';

var _ref;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
Reflect：
	1.特点：
		(1)将Object对象上面明显属于语言内部的方法部署到Reflect对象上，未来扩展的对象的新的方法只部署到Reflect上面
		(2)修改原有的一些方法的返回结果，例如：Object.defineProperty无法定义属性的时候会抛出一个错误，但是Reflect是返回一个false，表现的更加友好
		(3)让Object对象的操作都具有函数行为，例如：delete obj[name]改成Reflect.deleteProperty(obj, name)
		(4)Reflect方法和Proxy对象的方法操作一一对应，不管Proxy上面拦截什么行为，总是能通过Reflect方法恢复其默认行为
	2.静态方法：大部分方法和Object的同名方法作用是一样的
		get(target,name,receiver):查找并返回target对象的name属性，否则返回undefined
		set(target,name,value,receiver):设置target对象的name属性等于value值
		has(obj,name)相当于in操作符
		deleteProperty(obj,name)相当于delete操作符
		construct(target,args)等同于new操作符，不使用new也可以实例化对象
		getPrototypeOf:相当于Object.getPrototypeOf,获取对象的__prop__属性
		setPrototypeOf(obj,newProto):设置对象的__prop__
		apply(func,thisArg,args):用于绑定this对象后执行给定函数,相当于Function.prototype.apply.call(func, thisArg, args)
		defineProperty(target,propertyKey,attributes):为对象定义属性
		getOwnPropertyDescriptor:基本等同于Object.getOwnPropertyDescriptor
		isExtensible:表示当前对象是否可扩展
		preventExtensions:阻止对象扩展
		ownKeys:返回对象的所有属性
**/
var REF = {
	foo: 3,
	bar: 8
};
//get
var ref1 = {
	foo: 1,
	bar: 3,
	get baz() {
		return this.foo + this.bar;
	}
};
console.log(Reflect.get(ref1, 'baz')); //4
console.log(Reflect.get(ref1, 'baz', REF)); //11

//set
var ref2 = {
	foo: 12,
	set baz(value) {
		this.foo = value;
	}
};

Reflect.set(ref2, 'foo', 2);
console.log(ref2.foo); //2
Reflect.set(ref2, 'baz', 4);
console.log(ref2.foo); //4
Reflect.set(ref2, 'foo', 6, REF);
console.log(ref2.foo); //4	没变
console.log(REF.foo); //6
Reflect.set(ref2, 'baz', 9, REF);
console.log(ref2.foo); //4	没变
console.log(REF.foo); //9

//has
var ref3 = {
	foo: 9
};
console.log(Reflect.has(ref3, 'foo')); //true
console.log(Reflect.has(ref3, 'bar')); //false

//deleteProperty
var ref4 = {
	foo: 8
};
console.log(ref4); //{foo:8}
Reflect.deleteProperty(ref4, 'foo');
console.log(ref4); //{}

//construct
function ref5(name) {
	this.name = name;
}
var instance1 = Reflect.construct(ref5, ['xiaohong']);
console.log(instance1.name); //xiaohong

//getPrototypeOf
console.log(Reflect.getPrototypeOf(instance1)); //ref5 {}
console.log(ref5.prototype); //ref5 {}

//setPrototypeOf
function ref6(name) {
	this.name = name;
};
Reflect.setPrototypeOf(ref6, ref5.prototype);
console.log(Reflect.getPrototypeOf(ref6)); //ref5 {}

//apply
var instance3 = [1, 3, 4, 5];
console.log(Reflect.apply(Math.min, Math, instance3)); //1

//defineProperty
var ref7 = function ref7() {};
Reflect.defineProperty(ref7, 'name', {
	value: function value() {
		return new Date.now();
	}
});
console.log(ref7); //[Function: function value() {return new Date.now();}]

//getOwnPropertyDescriptor
var ref8 = {};
Reflect.defineProperty(ref8, 'show', {
	value: true,
	enumerable: true
});
console.log(Reflect.getOwnPropertyDescriptor(ref8, 'show')); //{ value: true,writable: false,enumerable: true,configurable: false }

//isExtensible
console.log(Reflect.isExtensible(ref8)); //true

//preventExtensions
var ref9 = {
	name: 'jie'
};
Reflect.preventExtensions(ref9); //阻止对象扩展
Reflect.defineProperty(ref9, 'addr', {
	value: '北京',
	enumerable: true
});
console.log(ref9); //{ name: 'jie' }

//ownKeys
var ref10 = (_ref = {
	foo: 1,
	bar: 2
}, _defineProperty(_ref, Symbol.for('baz'), 3), _defineProperty(_ref, Symbol.for('bing'), 4), _ref);

console.log(Reflect.ownKeys(ref10)); //[ 'foo', 'bar', Symbol(baz), Symbol(bing) ]


//使用 Proxy 实现观察者模式
var queuedObservers = new Set();

var observe = function observe(fn) {
	return queuedObservers.add(fn);
};
var observable = function observable(obj) {
	return new Proxy(obj, { set: set });
};

function set(target, key, value, receiver) {
	var result = Reflect.set(target, key, value, receiver);
	queuedObservers.forEach(function (observer) {
		return observer();
	});
	return result;
}

var person = observable({
	name: 'xiaohong',
	age: 20
});

function print() {
	console.log(person.name + ', ' + person.age);
}

observe(print);
//person.name = '李四';
