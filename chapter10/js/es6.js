/**
Symbol:
	1.在es5的基础上，添加了一个原始数据类型Symbol.前6种是：Undefined、Null、Boolean、String、Array、Object。
	2.属性名属于Symbol类型的，就都是独一无二的，可以保证不和其他属性名冲突
	3.Symbol不能和其他类型的数据进行运算
	4.Symbol可以显示的转换为字符串和布尔值
	5.内置的Symbol值
**/

let s1 = Symbol();
console.log(typeof s1);//symbol

let s2 = Symbol('a');//字符串参数表示对Symbol实例的描述
let s3 = Symbol({a:'1'});//如果参数是对象，会首先调用toString方法转化成字符串
const CONT = {
	toString(){
		return 'aa';
	}
};
console.log(s3);//Symbol([object Object])
console.log(Symbol(CONT));//Symbol(aa)
let s4 = Symbol('a');
console.log(s2 === s4);//false	s2和s4都是Symbol的返回值，并且参数相同，但是它们是不相等的
console.log(String(s1));//Symbol()
console.log(Boolean(s2));//true

//作为属性名,必须使用[]
var s5 = Symbol();
let obj1 = {};
obj1[s5] = "Hello";
console.log(obj1[s5]);//Hello
let obj2 = {
	[s5](args){
		return args;
	}
};
console.log(obj2[s5]('abc'));//abc

//属性名的遍历:只能使用Object.getOwnPropertySymbols()或者Reflect.ownKeys()
let obj3 = {
	[s1]:'aa',
	[s2]:'bb',
	'qt':'cc'
};
console.log(Object.getOwnPropertySymbols(obj3));//[ Symbol(), Symbol(a) ]
console.log(Reflect.ownKeys(obj3));//[ 'qt', Symbol(), Symbol(a) ]

//Symbol.for,Symbol.keyFor，确保使用的是同一个Symbol值
//Symbol.for:接受一个字符串作为参数，首先搜索有没有以该参数作为名称的Symbol值，如果有，就返回这个值，如果没有那么创建一个以这个字符串为名称的Symbol值
let s6 = Symbol.for('a');
let s7 = Symbol.for('a');
console.log(s6 === s7);//true
//Symbol.keyFor:返回一个已经登记的Symbol类型值的key
console.log(Symbol.keyFor(s6));//a
console.log(Symbol.keyFor(s2));//undefined	Symbol定义的属于未被登记的，所以返回undefined

//内置的Symbol值

//(1)Symbol.hasInstance:指向一个内部方法。当其他对象使用instanceof运算符，判断是否为该对象的实例时，调用这个方法
class MyClassInstance {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  }
}

console.log([1, 2, 3] instanceof new MyClassInstance()); // true

//(2)Symbol.isConcatSpreadable:布尔值，表示对象使用Array.prototype.concat()方法时，是否可以展开
let arr1 = ['a','b'];
console.log(['c','d'].concat(arr1,'e'));//[ 'c', 'd', 'a', 'b', 'e' ]
console.log(arr1[Symbol.isConcatSpreadable]);//undefined	Symbol.isConcatSpreadable=true/undefined时代表可以展开
let arr2 = ['w','s'];
arr2[Symbol.isConcatSpreadable] = false;//设置数组在合并时不可展开
console.log(['v'].concat(arr2));//[ 'v', [ 'w', 's' ] ]

//(3)Symbol.species:指向当前对象的构造函数，创建实例时，默认会调用这个方法，使用这个属性返回的函数当作构造函数，来创建实例对象
class MyArray extends Array {
  // 覆盖父类 Array 的构造函数
  static get [Symbol.species]() { return Array; }//使用Symbol.species返回的函数来创建MyArray的实例
}
var myArray = new MyArray(1,2);
console.log(myArray);//[1,2]

//(4)Symbol.match:对象的Symbol.match属性，指向一个函数。当执行str.match(myObject)时，如果该属性存在，会用它，返回该方法的返回值
class MyMatcher {
  [Symbol.match](string) {
    return 'hello world'.indexOf(string);
  }
}
console.log('e'.match(new MyMatcher())); // 1

//(5)Symbol.replace:对象的Symbol.replace属性，指向一个方法，当该对象被String.prototype.replace方法调用时，会返回该方法的返回值
const repalce = {};
repalce[Symbol.replace] = (...s) => console.log(s);
'Hello'.replace(repalce, 'World') // ["Hello", "World"]

//(6)Symbol.search:对象的Symbol.search属性，指向一个方法，当该对象被String.prototype.search方法调用时，会返回该方法的返回值
class MySearch {
  constructor(value) {
    this.value = value;
  }
  [Symbol.search](string) {
    return string.indexOf(this.value);
  }
}
console.log('foobar'.search(new MySearch('foo'))); // 0

//(7)Symbol.split:对象的Symbol.split属性，指向一个方法，当该对象被String.prototype.split方法调用时，会返回该方法的返回值
class MySplitter {
  constructor(value) {
    this.value = value;
  }
  [Symbol.split](string) {
    var index = string.indexOf(this.value);
    if (index === -1) {
      return string;
    }
    return [
      string.substr(0, index),
      string.substr(index + this.value.length)
    ];
  }
}

console.log('foobar'.split(new MySplitter('foo')));// ['', 'bar']
console.log('foobar'.split(new MySplitter('bar')));// ['foo', '']
console.log('foobar'.split(new MySplitter('baz')));// 'foobar'

//(8)Symbol.iterator:对象的Symbol.iterator属性，指向该对象的默认遍历器方法。
class Collection {
  *[Symbol.iterator]() {
    let i = 0;
    while(this[i] !== undefined) {
      yield this[i];
      ++i;
    }
  }
}

let myCollection = new Collection();
myCollection[0] = 1;
myCollection[1] = 2;

for(let value of myCollection) {
	console.log(value);//1 2
}

//(9)Symbol.toPrimitive:对象的Symbol.toPrimitive属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值
let objtoPrimitive = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number':
        return 123;
      case 'string':
        return 'str';
      case 'default':
        return 'default';
      default:
        throw new Error();
     }
   }
};
console.log(2 * objtoPrimitive); // 246
console.log(3 + objtoPrimitive); // '3default'
console.log(objtoPrimitive == 'default'); // true
console.log(String(objtoPrimitive)); // 'str'

//(10)Symbol.toStringTag:对象的Symbol.toStringTag属性，指向一个方法。在该对象上面调用Object.prototype.toString方法时，如果这个属性存在，它的返回值会出现在toString方法返回的字符串之中，表示对象的类型。也就是说，这个属性可以用来定制[object Object]或[object Array]中object后面的那个字符串。
console.log(({[Symbol.toStringTag]: 'Foo'}.toString()));// "[object Foo]"
class CollectionTag {
  get [Symbol.toStringTag]() {
    return 'xxx';
  }
}
var xTag = new CollectionTag();
console.log(Object.prototype.toString.call(xTag)); // "[object xxx]"

//(11)Symbol.unscopables:对象的Symbol.unscopables属性，指向一个对象。该对象指定了使用with关键字时，哪些属性会被with环境排除。