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
let cls5 = new class5();
console.log(cls5.getClassName());//me5
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
/**
1.通过extends关键字进行继承
2.在构造方法中使用super关键字调用父类的构造方法来绑定父类的this，这个是必须调用的,因为子类自己没有this对象
3.如果子类没有显式的定义构造方法，那么默认会创建一个构造方法
4.es6的继承机制是首先创造父类的实例this，所以在子类中需先调用super，然后再通过子类的构造函数修改this
5.类的prototype属性和__proto__属性:es5中，每一个对象都有一个__prop__属性，都是指向对应的构造函数的prototype属性;es6中，Class同时拥有prototype属性和__prop__属性
6.extends后面可以跟多种类型的值
***/
class subclass1 extends class1{
	constructor(x,y,z){
		super(x,y);//调用父类的构造方法获取this对象
		console.log(this);//subclass1 { x: 'z', y: 't' }
		this.z = z;
	}
	toString(){
		return this.z + ' ' + super.toString();//调用父类的toString方法
	}
}

//私有方法,就是将定义的方法放在class类定义的外面。
function pri1(){

}

let subcls1 = new subclass1('z','t','j');
console.log(subcls1.toString());//j (z, t)
console.log(subcls1 instanceof subclass1);//true
console.log(subcls1 instanceof class1);//true

//Object.getPrototypeOf(),判断一个类是否继承了另外一个类
console.log(Object.getPrototypeOf(subclass1) == class1);//true subclass1继承了class1
console.log(Object.getPrototypeOf(class1) == Object);//false

/**
super关键字：
	1.作为函数调用，代表父类的构造函数，执行super函数返回的是子类的实例
	2.作为对象时，指向的是父类的原型对象
	3.作为对象时，指向的是父类的原型对象，所以定义在父类实例上面的方法和属性是不能通过super访问的，只能访问定义在父类原型上面的方法和属性
	4.子类的原型的原型是父类的原型:subcls.__prop__.__prop__ = cls.__prop__
**/
class class7{
	constructor(){
		this.x = 'name';
		console.log(this);
	}
	p(){
		return 11;
	}
}
class7.prototype.y = 'age';
class subclass2 extends class7{
	constructor(){
		super();
		console.log(super.p());//作为对象，指向的是父类的实例,这里调用了父类的方法
		console.log(super.x);//undefined 取不到父类实例上面的属性
		console.log(super.y);//age 能取到父类定义在原型上的属性
	}
}
let cls7 = new class7();//class7 {}
let subcls2 = new subclass2();//subclass2 {} 11













