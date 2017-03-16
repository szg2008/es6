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
	1.键值对的集合,传统的Object只能将字符串当做键值,但是Map可以是任何类型的值当做键值
	2.'true'和true是2个不同的键值
	3.如果对同一个键值多次赋值，那么后面会覆盖前面
	4.键值是跟内存地址绑定的，只要内存地址不一样，即使键值一样，也被认为是不同的键
	5.属性:
		size:返回结构的成员总数
	6.方法:
		set:设置key所对应的键值，返回Map
		get:获取key所对应的键值
		has:返回布尔值，表示某个键是否在Map中
		delete:删除某个键
		clear:清除Map中所有成员
	7.遍历Map:keys,values,entries,forEach
**/
let m1 = new Map();
var o1 = {p:"Hello Map"};
m1.set(o1,'content');
console.log(m1);//Map { { p: 'Hello Map' } => 'content' }
console.log(m1.get(o1));//content
console.log(m1.has(o1));//true
m1.delete(o1);
console.log(m1.get(o1));//undefined
var m2 = new Map([
	['name','xiaohong'],
	['addr','beijing'],
	['gender','1']
]);
console.log(m2.get('name'));//xiaohong

m2.set('name','tom');//对同一个键值多次赋值
console.log(m2.get('name'));//tom
var k1 = ['a'],k2 = ['a'];
m2.set(k1,'111');
m2.set(k2,'222');
console.log(m2.get(k1));//111
console.log(m2.get(k2));//222
m2.set(NaN,234);
console.log(m2.get(NaN));//234

console.log(m2.size);//6

for(let key of m2.keys()){
	console.log(key);//name addr gender [ 'a' ] [ 'a' ] NaN
}
for(let value of m2.values()){
	console.log(value);//tom beijing 1 111 222 234
}
for(let [key,value] of m2.entries()){
	console.log(key,value);//name tom  addr beijing  gender 1  [ 'a' ] '111'  [ 'a' ] '222'  NaN 234
}
for(let item of m2){
	console.log(item);//[ 'name', 'tom' ]	[ 'addr', 'beijing' ]	[ 'gender', '1' ]	[ [ 'a' ], '111' ]	[ [ 'a' ], '222' ]	[ NaN, 234 ]
}

//Map结构转化成数组结构，使用...扩展符
console.log([...m2.keys()]);//[ 'name', 'addr', 'gender', [ 'a' ], [ 'a' ], NaN ]
console.log([...m2.values()]);//[ 'tom', 'beijing', '1', '111', '222', 234 ]
console.log([...m2.entries()]);//[ [ 'name', 'tom' ],[ 'addr', 'beijing' ],[ 'gender', '1' ],[ [ 'a' ], '111' ],[ [ 'a' ], '222' ],[ NaN, 234 ] ]


//Map与其他数据结构的相互转换
//1.Map转化为数组,使用扩展符
let m3 = new Map().set('foo',4).set(['a'],'baz').set(NaN,123);
console.log(m3);//Map { 'foo' => 4, [ 'a' ] => 'baz', NaN => 123 }
console.log([...m3]);//[ [ 'foo', 4 ], [ [ 'a' ], 'baz' ], [ NaN, 123 ] ]
//2.数组转化为Map,将数组传入Map的构造函数中就转化成Map了
console.log(new Map([[1,3],{'name':'john'},['ab']]));//Map { 1 => 3, undefined => undefined, 'ab' => undefined }
//3.Map转化为对象
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

let myMap1 = new Map().set('yes', true).set('no', false);
console.log(strMapToObj(myMap1));//{ yes: true, no: false }
//4.对象转化为Map
function objToStrMap(obj){
	var strMap = new Map();
	for(let k of Object.keys(obj)){
		strMap.set(k,obj[k]);
	}
	return strMap;
}
console.log(objToStrMap({yes: true, no: false}));//Map { 'yes' => true, 'no' => false }
//5.Map转化为Json,一种是键都是字符串，直接转成JSON，另一种是键含有其他类型的值，转化成JSON数组
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

let myMap2 = new Map().set('yes', true).set('no', false);
console.log(strMapToJson(myMap2));//{"yes":true,"no":false}

function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}

let myMap3 = new Map().set(true, 7).set({foo: 3}, ['abc']);
console.log(mapToArrayJson(myMap3));//[[true,7],[{"foo":3},["abc"]]]
//6.JSON转化成Map
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}
console.log(jsonToStrMap('{"yes":true,"no":false}'));//Map { 'yes' => true, 'no' => false }

function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}
console.log(jsonToMap('[[true,7],[{"foo":3},["abc"]]]'));//Map { true => 7, { foo: 3 } => [ 'abc' ] }
/**
WeakMap:
	类似Map，唯一区别就是，只接受对象作为键名,创建的对象被回收避免造成内存溢出
	只有set get delete has四个方法可以使用
**/
var wm1 = new WeakMap().set([1,2],'weakmap');
console.log(wm1);//WeakMap {}

console.log('****************practice***********************');
let pracA = new Set();
pracA.add(1);
pracA.add('aa');
pracA.add({name:'a'});
console.log(pracA);
console.log(Array.from(pracA));//[ 1, 'aa', { name: 'a' } ]
console.log([...pracA]);//[ 1, 'aa', { name: 'a' } ]
pracA.delete('aa');
console.log([...pracA]);//[ 1, { name: 'a' } ]
pracA.add(1);//[ 1, { name: 'a' } ] 不添加重复的元素
console.log(pracA.size);//2
let pracB = new WeakSet();
pracB.add({"name":"xiaho"});
console.log(pracB);
let pracC = new Map();
pracC.set('name','xiohon');
pracC.set('name','xiog');//覆盖前面的键值
pracC.set('age',13);
console.log(pracC.get('name'));
console.log(pracC);
console.log([...pracC]);
console.log([...pracC.keys()]);//[name,age]
console.log(new Map([['name','ee'],['age','7']]));//Map { 'name' => 'ee', 'age' => '7' }
//Map转化成对象
var mapToObj = Object.create(null);
for(let [k,v] of pracC){
	mapToObj[k] = v;
}
console.log(mapToObj);//{ name: 'xiog', age: 13 }
console.log(Object.keys(mapToObj));//[ 'name', 'age' ]
//对象转换成Map
var objToMap = new Map();
for(let k of Object.keys(mapToObj)){
	objToMap.set(k,mapToObj[k]);
}
console.log(objToMap);//Map { 'name' => 'xiog', 'age' => 13 }
//Map转化成Json:先转化成对象，然后stringify
//Json转化成Map:先转化成对象，然后再转化成Map




