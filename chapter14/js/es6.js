/***
Iterator和for...of循环
	1.es6中规定，默认的Iterator接口部署在数据结构的Symbol.iterator属性中，一个数据结构中只要有Symbol.iterator属性，那么久认为是可以遍历的。
	2.默认原生就部署Iterator接口的数据结构有三类:数组、某些类似数组的对象、Map和Set结构
	3.字符串的Iterator接口
	4.遍历器对象的return()和throw(),自定义一个遍历器对象函数，next()是必须的，return和throw是可选的。return方法一般用在没有完成遍历之前，需要提前退出的情况
*/
//模拟Iterator
let iter1 = ['a','b','c'];
function makeIterator(array){
	var nextIndex = 0;
	return {
		next:function(){
			return nextIndex < array.length ? {value:array[nextIndex++],done:false}:{value:undefined,done:true}
		}
	}
}
let it1 = makeIterator(iter1);
console.log(it1.next());//{ value: 'a', done: false }
console.log(it1.next());//{ value: 'b', done: false }

let iter2 = [1,3,5,7];
var it2 = iter2[Symbol.iterator]();//数组本身就具有这个属性，所以部署上去，就能够得到遍历器对象
console.log(it2.next());//{ value: 1, done: false }

//调用Iterator接口的场合
//1.解构赋值:对数组或者Set进行解构赋值时，会默认调用Symbol.iterator方法.
let iter3 = new Set().add('a').add('b');
let [x,y] = iter3;
console.log([x,y]);//['a','b']
//2.扩展运算符也会调用默认的iterator
let iter4 = 'HELLO WORLD!!!';
console.log([...iter4]);//[ 'H', 'E', 'L', 'L', 'O', ' ', 'W', 'O', 'R', 'L', 'D', '!', '!', '!' ]
//3.yield*:后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口
let iter5 = function*(){
	yield 1;
	yield* [2,3,6];
	yield 8;
}

var it3 = iter5();
console.log(it3.next());//{ value: 1, done: false }

//字符串:字符串是一个类似数组的对象，所以也具有Iterator接口
var iter6 = 'xiaohong';
console.log(iter6[Symbol.iterator]);//[Function: [Symbol.iterator]]
var it4 = iter6[Symbol.iterator]();
console.log(it4.next());//{ value: 'x', done: false }

/********
for...of循环:只要部署了Iterator接口，就可以使用这个循环
	数组
	Set和Map结构
*****/
//数组
const iter7 = ['red', 'green', 'blue'];

for(let v of iter7) {
  console.log(v); // red green blue
}

const iter8 = {};
iter8[Symbol.iterator] = iter7[Symbol.iterator].bind(iter7);
//给iter6部署了iter7的iterator接口，所以遍历iter8输出的是iter7的属性对象

for(let v of iter8) {
  console.log(v); // red green blue
}

//Set和Map结构,按照各个成员添加的顺序进行输出
var iter9 = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
for(let v of iter9) {//不输出重复的数据
	console.log(v);//"Gecko", "Trident", "Webkit"
}
let iter10 = new Map();
iter10.set('edtion',9);
iter10.set('committee',11);
iter10.set('scholl',67);
for(let [name,value] of iter10){
	console.log(name,value);//edtion 9	committee 11	scholl 67
}
console.log(iter10.keys());//MapIterator { 'edtion', 'committee', 'scholl' }
console.log(iter10.entries());//MapIterator { [ 'edtion', 9 ], [ 'committee', 11 ], [ 'scholl', 67 ] }
console.log(iter10.values());//MapIterator { 9, 11, 67 }

//对于普通的对象，不能使用for...of进行遍历，必须实现Iterator接口才能进行遍历，但是只能使用for...in进行遍历键值

/**
	for...of相比于其他遍历语法的优势：
		1.有着同for...in一样的语法，但是没有for...in那些缺点
		2.它可以和break、continue和return配合使用
		3.提供了遍历所有数据结构的统一操作接口
**/