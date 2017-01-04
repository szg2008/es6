'use strict';

/**
Proxy
	1.用于修改某些操作的默认行为。在目标对象上面架设一层"拦截",外界对该对象的访问，都要通过这层拦截
	2.Proxy支持的拦截操作：
		get:拦截某个属性的读取操作
		set:拦截某个属性的赋值操作
**/
var proxy1 = new Proxy({}, {
	get: function get(target, key, receiver) {
		console.log('getting ' + key + '!');
		return Reflect.get(target, key, receiver);
	},
	set: function set(target, key, value, receiver) {
		console.log('setting ' + key + '!');
		return Reflect.set(target, key, value, receiver);
	}
});
proxy1.count = 1; //setting count!
++proxy1.count; //getting count!	setting count!
console.log(proxy1.count); //getting count!	2

var proxy2 = new Proxy({}, {
	get: function get(target, property) {
		return 35;
	}
});
console.log(proxy2.time); //35
console.log(proxy2.date); //35

var proxy3 = new Proxy({}, {}); //目标对象为空，第二个参数handler为空，相当于没有给对象设置拦截
proxy3.count = 'cc';
console.log(proxy3.count); //cc

//get
var person = { 'name': 'guifei' };
var proxy4 = new Proxy(person, {
	get: function get(target, property) {
		if (property in target) {
			return target[property];
		} else {
			throw new ReferenceError("Property \"" + property + "\" does not exist.");
		}
	}
});
console.log(proxy4.name);
//console.log(proxy4.age);//如果不定义拦截，那么直接返回undefined

//get可以继承
var proxy5 = new Proxy({}, {
	get: function get(target, property, receiver) {
		console.log("Get " + property);
		if (property in target) {
			return target[property];
		} else {
			return 'default';
		}
	}
});
var obj1 = Object.create(proxy5);
obj1.name; //Get name
console.log(obj1.name); //default
//使用get转变成执行某个函数
//如果一个属性不可配置（configurable）和不可写（writable），则该属性不能被代理，通过 Proxy 对象访问该属性会报错。
var pipe = function () {
	return function (value) {
		var funcStack = [];
		var oproxy = new Proxy({}, {
			get: function get(pipeObject, fnName) {
				console.log(fnName);
				if (fnName === 'get') {
					return funcStack.reduce(function (val, fn) {
						return fn(val);
					}, value);
				}
				funcStack.push(fnName);
				return oproxy;
			}
		});
		return oproxy;
	};
}();

var double = function double(n) {
	return n * 2;
};
var pow = function pow(n) {
	return n * n;
};
var reverseInt = function reverseInt(n) {
	return n.toString().split("").reverse().join("") | 0;
};
console.log(pipe(3).double.pow.reverseInt);

//set
//注意，如果目标对象自身的某个属性，不可写也不可配置，那么set不得改变这个属性的值，只能返回同样的值，否则报错。
var validator = {
	set: function set(obj, prop, value) {
		//只是针对其中的一个属性进行操作
		if (prop === 'age') {
			if (!Number.isInteger(value)) {
				throw new TypeError('The age is not an integer');
			}
			if (value > 200) {
				throw new RangeError('The age seems invalid');
			}
		} else {
			obj[prop] = value;
		}
		//其他值直接保存
		//obj[prop] = value;
	}
};
var proxy6 = new Proxy({}, validator);
//proxy6.age = 100;
//console.log(proxy6.age);
//proxy6.age = 'old';
//proxy6.age = 250;
