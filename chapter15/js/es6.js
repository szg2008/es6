/**
Generator函数：
	1.是一个状态机，封装了多个内部状态：yield、return等
	2.执行该函数不会返回函数的运行结果，而是返回一个遍历器生成对象Iterator，通过调用这个对象的next方法来输出函数内部定义的每一个状态
	3.写法和普通函数的区别：(1)function关键字和函数名之间有一个*;(2)函数体内部使用yield语句来定义不同的状态
**/

function* generator1(){
	yield 'hello';
	yield 'generator';
	return '!!!';
}
let gene1 = generator1();//生成一个遍历器对象
console.log(gene1);//GeneratorFunctionPrototype { _invoke: [Function: invoke] }
console.log(gene1.next());//{ value: 'hello', done: false }

/**
next方法的参数：当做上一个yield语句的返回值.
注意：yield的返回值通常是undefined
	
**/
function* generator2() {
  for(var i = 0; true; i++) {
    var reset = yield i;
    if(reset) { i = -1; }
  }
}

var gene2 = generator2();

console.log(gene2.next()); // { value: 0, done: false }
console.log(gene2.next()); // { value: 1, done: false }
console.log(gene2.next(true)); // { value: 0, done: false }

function* generator3(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var gene3 = generator3(5);
console.log(gene3.next()) // Object{value:6, done:false}
console.log(gene3.next()) // Object{value:NaN, done:false}
console.log(gene3.next()) // Object{value:NaN, done:true}

var gene4 = generator3(5);
console.log(gene4.next()) // { value:6, done:false }
console.log(gene4.next(12)) // { value:8, done:false }
console.log(gene4.next(13)) // { value:42, done:true }

/**
for...of循环：
	可以自动遍历Generator函数时生成的Iterator对象，不需要使用next方法
	除了for...of循环之外，...扩展运算符、解构赋值、Array.from方法内部调用，都是遍历器接口，都可以将Generator函数生成的对象，作为参数进行遍历
**/
function* generator5(){
	yield 1;
	yield 2;
	return 'ending';
}

for(let v of generator5()){
	console.log(v);//1 2	不包含return返回的值
}

console.log([...generator5()]);//[1,2]
console.log(Array.from(generator5()));//[1,2]

console.log(generator5());

/**
Generator.prototype.throw()
	遍历器的方法throw和全局throw有区别，前者既能在函数体内被捕获，也能在函数体外被捕获，后者只能在函数体外捕获
	如果在Generator函数内部没有部署try...catch语句，那么将在函数体外进行捕获，如果都没有部署，那么程序直接报错，中断执行

**/

let generator6 = function* (){
	try{
		yield;
	}catch(e){
		console.log('inner',e);
	}
}

let gene6 = generator6();
console.log(gene6.next());//{ value: undefined, done: false }

try{
	gene6.throw('a');
	gene6.throw('b');

}catch(e){
	console.log('outer',e);
}
//inner a
//outer b

let generator7 = function* (){
	yield console.log('aa');
	yield console.log('bb');
}

var gene7 = generator7();
gene7.next();
try{
	throw new Error('err');
}catch(e){
	gene7.next();
}
//aa bb

/**
Generator.prototype.return():返回给定的值，并且终结遍历Generator函数,如果return参数没有参数，那么返回的value值是undefined.
	如果Generator内部有try...finally语句，那么在执行return方法的时候首先执行的是finally语句，然后再执行return
**/
let generator8 = function* (){
	yield 2;
	yield 5;
	yield 8;
}

var gene8 = generator8();
console.log(gene8.next());//{value:1,done:false}
console.log(gene8.return('ending'));//{ value: ending, done: true }，done的值是true，代表已经终结遍历
console.log(gene8.next());//{ value: undefined, done: true }

let generator9 = function* (){
	yield 2;
	try{
		yield 5;
	}finally{
		yield 6;
		yield 8;
	}
	yield 10;
}
var gene9 = generator9();
console.log(gene9.next());//{value:2,done:false}
console.log(gene9.next())//{value:5,done:false}
console.log(gene9.return(44));//{value:6,done:false}
console.log(gene9.next());//{value:8,done:false}
console.log(gene9.next());//{value:44,done:false}

/**
yield* 语句:在一个Generator函数内部调用另外一个Generator函数
	后面的数据结构只要有Iterator接口，就会返回遍历的结果，例如：数组
**/
function* generator10(){
	yield 3;
	yield 'starting';
}
function* generator11(){
	yield 5;
	yield* generator10();
	yield 'ending';
	yield* ['q','m','n']
}

for(let v of generator11()){
	console.log(v);//5	3	starting	ending	q	m	n
}

/**
	作为对象属性的Generator函数
**/
let obj1 = {
	mygenerator1:function*(){
		yield 1;
	}
};
console.log(obj1.mygenerator1().next());//{ value: 1, done: false }

/**
Generator函数的this
	Generator函数不能跟new操作符一起使用
**/
function* generator12() {}

generator12.prototype.hello = function () {
  return 'hi!';
};

let obj2 = generator12();

console.log(obj2 instanceof generator12); // true
console.log(obj2.hello()); // 'hi!'


function* generator13() {
	this.a = 23;
}

let obj3 = generator13();
console.log(obj3.a);//undefined

//利用一个空对象来辅助
function* generator14() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
var obj4 = {};
var gene14 = generator14.call(obj4);

console.log(gene14.next());  // Object {value: 2, done: false}
console.log(gene14.next());  // Object {value: 3, done: false}
console.log(gene14.next());  // Object {value: undefined, done: true}
//遍历完成之后就会将Generator函数中定义的属性全部绑定在obj4上面了
console.log(obj4.a); // 1
console.log(obj4.b); // 2
console.log(obj4.c); // 3

//将gene14和obj4改成同一个对象,办法就是将obj4改成generator14.prototype


