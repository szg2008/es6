/**
Class
	class定义类名、constructor定义构造函数、定义方法之间不能使用标点符号
**/
//定义类
class class1{
    constructor(x,y){
    	this.x = x;
    	this.y = y;
    }
    toString(){
    	return '(' + this.x + ', ' + this.y + ')';
    }
}

var cls1 = new class1('hww','eee');
console.log(cls1.toString());//(hww, eee)
//在实例上面调用定义的方法，实际上就是在调用原型上面的方法
console.log(typeof class1);//function
//类的所有方法都定义在类的prototype属性上面
console.log(class1 === class1.prototype.constructor);//true

class class2{}
let cls2 = new class2();
console.log(cls2.constructor === class2.prototype.constructor);//true
//实例的构造方法实际上就是对象原型上面的构造方法
//使用Object.assgin定义类的方法
Object.assign(class2.prototype,{
	toString(){
		console.log('toString');
	},
	toValue(){
		console.log('toValue');
	}
});
cls2.toString();//toString
cls2.toValue();//toValue


/**
constructor:
	1.类的默认方法,通过new命令符生成对象实例时，自动调用这个方法
	2.默认的返回值是this，指向当前对象，但是构造方法可以被重写
*/
class class3{
	constructor(){
		return Object.create(null);
	}
}
let cls3 = new class3;
console.log(cls3 instanceof class3);//false 	默认的构造方法返回值被重写了，导致生成的实例类型不是class3


/**
类的实例对象：
	1.生成的类的实例对象必须使用new进行构造
	2.实例的属性如果不是显式的声明在本身，则都是定义在原型上面
	3.类的实例共享一个实例
	4.不存在变量提升，必须先声明，然后再使用new
	5.class表达式
**/

class class4{
	constructor(x){
		this.x = x;
	}
}

let cls4_1 = new class4(1);
let cls4_2 = new class4(2);
console.log(cls4_1.__prop__ === cls4_2.__prop__);//true  原型都是一个
//class表达式
let class5 = class me5{
	getClassName(){
		return me5.name;
	}
}
//立即执行的class
var class6 = new class{
	constructor(name){
		this.name = name;
	}
	sayName(){
		return this.name;
	}
}('suzg');
console.log(class6.sayName());//suzg


/*******************类的继承**********************/







