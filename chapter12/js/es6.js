/**
Proxy
	1.用于修改某些操作的默认行为。在目标对象上面架设一层"拦截",外界对该对象的访问，都要通过这层拦截
	2.Proxy支持的拦截操作：
		get:拦截某个属性的读取操作
		set:拦截某个属性的赋值操作
		apply:拦截函数的调用、apply、call操作
		has:拦截HasProperty操作，判断对象是否具有某个属性时，会生效，常见的是使用in操作符
**/
let proxy1 = new Proxy({},{
	get:function(target,key,receiver){
		console.log(`getting ${key}!`);
		return Reflect.get(target,key,receiver);
	},
	set:function(target,key,value,receiver){
		console.log(`setting ${key}!`);
		return Reflect.set(target,key,value,receiver);
	}
});
proxy1.count = 1;//setting count!
++proxy1.count;//getting count!	setting count!
console.log(proxy1.count);//getting count!	2

let proxy2 = new Proxy({},{
	get:function(target,property){
		return 35;
	}
});
console.log(proxy2.time);//35
console.log(proxy2.date);//35

let proxy3 = new Proxy({},{});//目标对象为空，第二个参数handler为空，相当于没有给对象设置拦截
proxy3.count = 'cc';
console.log(proxy3.count);//cc

//get
var person = {'name':'guifei'};
var proxy4 = new Proxy(person,{
	get(target,property){
		if(property in target){
			return target[property];
		}else{
			throw new ReferenceError("Property \"" + property + "\" does not exist.");
		}
	}
});
console.log(proxy4.name);
//console.log(proxy4.age);//如果不定义拦截，那么直接返回undefined

//get可以继承
let proxy5 = new Proxy({},{
	get(target,property,receiver){
		console.log("Get " + property);
		if(property in target){
			return target[property];
		}else{
			return 'default';
		}
	}
});
let obj1 = Object.create(proxy5);
obj1.name;//Get name
console.log(obj1.name);//default
//使用get转变成执行某个函数
//如果一个属性不可配置（configurable）和不可写（writable），则该属性不能被代理，通过 Proxy 对象访问该属性会报错。
var pipe = (function () {
	return function (value) {
		var funcStack = [];
		var oproxy = new Proxy({} , {
			get(pipeObject, fnName) {
				console.log(fnName);
				if (fnName === 'get') {
					return funcStack.reduce(function (val, fn) {
						return fn(val);
					},value);
				}
				funcStack.push(fnName);
				return oproxy;
			}
		});
		return oproxy;
	}
}());

var double = n => n * 2;
var pow    = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;
console.log(pipe(3).double.pow.reverseInt);

//set
//注意，如果目标对象自身的某个属性，不可写也不可配置，那么set不得改变这个属性的值，只能返回同样的值，否则报错。
let validator = {
	set(obj,prop,value){
		//只是针对其中的一个属性进行操作
		if(prop === 'age'){
			if(!Number.isInteger(value)){
				throw new TypeError('The age is not an integer');
			}
			if(value > 200){
				throw new RangeError('The age seems invalid');
			}
		}else{
			obj[prop] = value;
		}
		//其他值直接保存
		//obj[prop] = value;
	}
};
let proxy6 = new Proxy({},validator);
//proxy6.age = 100;
//console.log(proxy6.age);
//proxy6.age = 'old';
//proxy6.age = 250;

//apply
//接受三个参数:目标对象,目标对象的上下文对象,目标对象的参数数组
var applyTarget = function(){return 'I am target';}
let applyHandler = {
	apply(target,ctx,args){
		return 'I am proxy';
	}
};
var proxy7 = new Proxy(applyTarget,applyHandler);
console.log(proxy7());//I am proxy

var applyHandler2 = {
	apply(target, ctx, args) {
		return Reflect.apply(...arguments) * 6;
	}
};
function sum (left, right) {
	return left + right;
};
var proxy8 = new Proxy(sum, applyHandler2);
console.log(proxy8(1, 2)); // 18	调用函数
console.log(proxy8.call(null, 5, 6)); // 66		使用call
console.log(proxy8.apply(null, [7, 8])); // 90	使用apply

//has
//for...in将不受has拦截的影响
//如果某个属性时 不可设置的，那么使用has拦截会出错
var applyHandler3 = {
	has(target,key){
		if(key[0] === '_'){
			return false;
		}
		return key in target;
	}
};
var applyTarget2 = { _prop: 'foo', prop: 'foo' };
var proxy9 = new Proxy(applyTarget2, applyHandler3);
console.log('_prop' in proxy9); //false
console.log('prop' in proxy9);//true