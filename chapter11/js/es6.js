/**
Set和Map数据结构

**/
/**
Set:
	1.本身就是一个构造函数，可以直接使用new
	2.类似于数组的一个对象，但是成员的值是唯一的。去除数组中重复成员，可以直接使用Set
	3.使用add方法向set加入数值时，不会发生类型转换，例如：4和'4'是两个不同的值,但是NaN是等于自身的，如果加入两个对象，那么这两个对象始终认为是不相等的。
	4.Set实例的属性：constructor size
	5.Set实例的方法：
		add(value):返回Set;
		delete(value):删除某个值,返回布尔值;
		has(value):是否是Set结构的成员;
		clear():清除所有成员
	6.Set遍历：keys(),values(),entries(),forEach(),由于Set不存在键值，所以keys和values效果是一样滴
**/
var s1 = new Set();
[12,3,45,6,3,3,12].map(x => s1.add(x));
for(let key of s1){
	console.log(key);//12 3 45 6
}
var s2 = new Set([1,3,4,5,5,3]);
console.log(s2.size);//4	直接去重
console.log(s2);//Set { 1, 3, 4, 5 }
console.log([...s2]);//[ 1, 3, 4, 5 ]
s2.add({});
console.log(s2.size);//5
s2.add({});
console.log(s2.size);//6
console.log([...s2]);//[ 1, 3, 4, 5, {}, {} ]
s2.delete(3);
console.log([...s2]);//[ 1, 4, 5, {}, {} ]
console.log(s2.has(1));//true
//去除数组中重复成员的一种方法！！！
let dedupe = array => Array.from(new Set(array));
console.log(dedupe([1,3,4,6,7,8,3,1,4]));//去重，Array.from能将Set结构的数据转化成数组	[1,3,4,6,7,8]
//Set遍历
let s3 = new Set(['red','blue','yellow']);
for(let key of s3.keys()){
	console.log(key);//red blue yellow
}
for(let key of s3.values()){
	console.log(key);//red blue yellow
}
for(let key of s3.entries()){
	console.log(key);//[ 'red', 'red' ][ 'blue', 'blue' ][ 'yellow', 'yellow' ]
}
for(let key of s3){//可以直接使用Set进行遍历
	console.log(key);//red blue yellow
}
s3.forEach((key,value) => console.log(value + ' susu'));//red susu	blue susu	yellow susu


/**
WeakSet:
	1.和Set结构类似
	2.成员只能是对象，不能是其他类型的数据
	3.不可遍历，没有forEach方法和size属性
	4.有add、delete、has方法
**/
let s4 = [{'name':'hong'},{'addr':'beijing'}];
let s5 = [1,3];
var weakSet1 = new WeakSet(s4);
console.log(weakSet1);//WeakSet {}
//var weakSet2 = new WeakSet(s1);
//console.log(weakSet2);//Error

/**
Map
**/