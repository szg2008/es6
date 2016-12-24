/**
 * 函数的扩展
 */

//1.函数参数的默认值
/**
基本用法,函数参数可以添加默认值,参数默认是已经定义的,所以不能再使用let const var再次声明
**/
function fun1(x,y="World"){
    console.log(x + ' ' + y);
}
fun1('Hello');//Hello World

function Point(x=0,y=0){
	this.x = x;
	this.y = y;
}

var point = new Point();
console.log(point.x,point.y);

/**
和解构赋值默认值结合使用
**/
function fun2({x,y=5}){
    console.log(x,y);
}

fun2({});//undefined 5
fun2({x:1});//1 5
fun2({x:3,y:9});//3 9
//fun2();//error

function fetch1(url,{body="body",method='get'}){
	console.log(method);
}

fetch1('https://www.baidu.com',{});//如果只是传递第一个参数，那么会报错

function fetch2(url,{body="body",method='post'}={}){
	console.log(method);
}

fetch2('https://www.baidu.com');//函数参数有默认值，所以第二个参数不用指定默认值

/**
参数默认值的位置
	如果定义了函数的默认值，通常都是尾参数(该函数的最后一个参数)
	如果不是最后一个参数，那么在调用函数的时候应该显示的传入undefined，否则会报错
**/
function param(x=1,y){
	console.log(x,y);
}

param(2,4);//2,4
param(undefined,8);//1,8
param(8);//8 undefined
//param(,9);//Error
param(null,7);//null,7	传入null的时候不会触发参数的默认值

/**
函数的length属性
	如果函数的参数中指定了默认值，那么length在返回的时候不包含这个参数
	如果设置默认值的参数不是尾参数，那么length属性也不再计入这个参数后面的参数了
**/
console.log((function(a=2,b,c){}).length);//0，因为设置默认值的参数不是尾参数
console.log((function(a,b,c,d=2){}).length);//3，设置了默认值的参数不会计算在length属性中
/**
作用域
	如果参数的默认值是一个变量，那么这个变量的作用域先是当前函数的作用域，然后才是全局作用域scope1
	如果函数参数的默认值是一个函数，那么该函数的作用域是其在声明时所在的作用域scope3
**/
var x = 1;
function scope1(x,y=x){//这里的变量x遵循作用域的规则
	console.log(y);//这时y的默认值x已经在函数内部生成，所以默认值是函数内部的x，而不是全局的x
}
scope1(2);//2
//如果x没有生成，会输出不一样的结果，即直接指向的是全局作用域的x	scope2
let x2 = 3;
function scope2(y=x2){
	let x2 = 7;
	console.log(y);
}
scope2();//3

let foo = 'outer';
function scope3(func = x =>foo){
	let foo = 'inner';
	console.log(func());
}
scope3();//inner

function scope4(func = () => foo2) {
  let foo2 = 'inner2';
  console.log(func());
}

scope4();//inner2

var x5 = 1;
function foo5(x5, y5 = function() { x5 = 2; }) {
  var x5 = 3;
  y5();
  console.log(x5);
}

foo5() // 2

var x6 = 1;
function foo6(x6, y = function() { x6 = 2; }) {
  x6 = 3;
  y();
  console.log(x6);
}

foo6() // 2

/**
	应用
**/
function throwError(){
	throw new Error('Missing params!');
}
function apply(param = throwError()){
	
}

apply(1);//如果没有参数，就会执行默认指定的抛出错误的函数throwError



//rest参数	...变量名，它是一个数组
//注：rest参数后面不能再加参数，也就是rest参数是函数的最后一个参数
function add(...values){
	let sum = 0;
	for(let val of values){
		sum += val;
	}
	return sum;
}
console.log(add(2,4,14,56));//76	参数和

//扩展运算符...,将一个数组转化成一个以逗号分隔的参数序列
console.log(1,...[2,4,5],9);//1 2 4 5 9

var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1.push(...arr2);
console.log(arr1);//[0, 1, 2, 3, 4, 5]
/**
	(1)合并数组
	(2)和解构赋值结合使用
	(3)可以通过扩展运算符来扩展函数的返回值(一次返回多个值，而不是用数组或者对象的形式)
	(4)可以将字符串转化成真正的数组
	(5)能将所有实现了Iterator接口的对象转化成真正的数组，例如:Nodelist对象，之前只能通过Array.prototype.slice.call进行转化
	(6)Map、Set结构		Generator函数
**/
console.log([...arr1, ...arr2]);//[0, 1, 2, 3, 4, 5, 3, 4, 5]
const [firstarr,...restarr] = [3,5,67,8];//赋值的时候rest必须放在最后一个，否则会报错
console.log(firstarr);//3
console.log(restarr);//[5,67,8]



