'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _bianliObj;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
对象的扩展
**/

/**
属性的简洁表示法
	es6允许在对象中直接写变量，这个时候，属性名是变量名，属性值是变量的值
	方法也可以简写
**/
var foo = 'bar';
var baz = { foo: foo };
console.log(baz); //{foo:bar}
function fun1(x, y) {
	return { x: x, y: y };
}
console.log(fun1(3, 7)); //{x;3,y:7}
//方法简写
var fun2 = {
	method: function method() {
		return 'Hello Fun2';
	}
};
console.log(fun2.method()); //Hello Fun2
//综合属性和方法简写的例子
var attr1 = '20161227';
var fun3 = {
	attr1: attr1, //属性简写
	method: function method() {
		//方法简写
		return 'Hello Fun3';
	}
};
console.log(fun3.attr1); //20161227
console.log(fun3.method()); //Hello Fun3

/**
属性名表达式
	允许使用字面量定义对象的时候，使用表达式作为对象的属性名进行定义
**/
var attr2 = 'attr2';
var fun4 = _defineProperty({}, attr2, true);
console.log(fun4[attr2]); //true
console.log(fun4['attr2']); //true

/**
方法的name属性
	函数的name属性，返回函数名
	bind方法创造的函数，name属性返回的值等于bound+原函数的名称
	Function创造的函数，name属性返回anonymous
**/
var fun5 = {
	'attr3': false,
	method: function method() {
		return 'Hello Fun5';
	}
};
console.log(fun5.attr3); //false
console.log(fun5.method.name); //method
console.log(new Function().name); //anonymous
console.log(fun5.method.bind().name); //bound method

/**
Object.is():比较两个值是否相等
	'==':自动转换数据类型
	'===':不会自动转换数据类型。NaN===NaN //false	+0===-0 //true
**/
console.log(Object.is('foo', 'foo')); //true
console.log(Object.is({}, {})); //false
console.log(Object.is(+0, -0)); //false
console.log(Object.is(NaN, NaN)); //true	NaN等于自身

/**
Object.assign：用于对象的合并,将源对象的所有可枚举属性都复制到目标对象上
	第一个参数是目标对象，后面所有的参数都是源对象,如果对象之间存在相同的属性，那么后面的会覆盖前面的.
	如果undefined和null作为第一个参数传入，会报错
	如果传入的参数不是对象，会首先将其转化成对象
	assign属于浅拷贝
	为属性指定默认值
	为对象添加属性和方法
**/
var target1 = { a: 1 };
var source1 = { b: 54 };
console.log(Object.assign(target1, source1)); //{a:1,b:54}
var source2 = { b: 2, c: 8 };
var source3 = { a: 45, d: 7 };
console.log(Object.assign(target1, source1, source2, source3)); //{ a: 45, b: 2, c: 8, d: 7 }
//console.log(Object.assign(undefined));//error
//console.log(Object.assign(null));//error
console.log(Object.assign(2)); //[Number:2]
console.log(Object.assign(2, source1)); //{ [Number: 2] b: 54 }
console.log(Object.assign(2, source1).b); //54
//指定默认值
var assign1Default = {
	level: 1,
	message: function message() {
		return this.level;
	}
};
var assign1 = {
	level: 3
};
console.log(Object.assign({}, assign1Default, assign1)); //{ level: 3, message: [Function: message] }
/**
属性的遍历
	(1)for...in		遍历对象自身的和继承的可枚举属性
	(2)Object.keys()	返回一个数组，包含对象自身的可枚举属性
	(3)Object.getOwnPropertyNames()		包含对象自身的所有属性(包括不可枚举属性)
	(4)Object.getOwnPropertySymbols()	返回一个数组，包含对象自身的所有Symbol属性。
	(5)Reflect.ownKeys	返回一个数组，包含对象自身的所有属性，不管是属性名是Symbol或字符串，也不管是否可枚举。
注意：属性遍历的次序规则：
	(1)首先遍历所有属性名为数值的属性，按照数字排序。
	(2)其次遍历所有属性名为字符串的属性，按照生成时间排序。
	(3)最后遍历所有属性名为Symbol值的属性，按照生成时间排序。
**/
var bianliObj = (_bianliObj = {}, _defineProperty(_bianliObj, Symbol(), 0), _defineProperty(_bianliObj, 'b', 0), _defineProperty(_bianliObj, 10, 0), _defineProperty(_bianliObj, 2, 0), _defineProperty(_bianliObj, 'a', 0), _bianliObj);
Object.defineProperty(bianliObj, 'a', {
	enumerable: false
});
console.log(Reflect.ownKeys(bianliObj)); //[ '2', '10', 'b', 'a', Symbol() ]
console.log(Object.keys(bianliObj)); //[ '2', '10', 'b']
console.log(Object.getOwnPropertyNames(bianliObj)); //[ '2', '10', 'b', 'a']
console.log(Object.getOwnPropertySymbols(bianliObj)); //[Symbol()]
/**
Object.keys()	返回一个数组，成员是参数对象自身所有可遍历属性的键名
Object.values()	返回一个数组，成员是参数对象自身的所有可遍历属性的键值
Object.entries()返回一个数组，成员是参数对象自身的所有可遍历属性的键值对数组	
**/
var keys = Object.keys,
    values = Object.values,
    entries = Object.entries;

var objkev = { a: 1, b: 2, c: 3 };

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
	for (var _iterator = keys(objkev)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		var key = _step.value;

		console.log(key); // 'a', 'b', 'c'
	}
} catch (err) {
	_didIteratorError = true;
	_iteratorError = err;
} finally {
	try {
		if (!_iteratorNormalCompletion && _iterator.return) {
			_iterator.return();
		}
	} finally {
		if (_didIteratorError) {
			throw _iteratorError;
		}
	}
}

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
	for (var _iterator2 = values(objkev)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
		var value = _step2.value;

		console.log(value); // 1, 2, 3
	}
} catch (err) {
	_didIteratorError2 = true;
	_iteratorError2 = err;
} finally {
	try {
		if (!_iteratorNormalCompletion2 && _iterator2.return) {
			_iterator2.return();
		}
	} finally {
		if (_didIteratorError2) {
			throw _iteratorError2;
		}
	}
}

var _iteratorNormalCompletion3 = true;
var _didIteratorError3 = false;
var _iteratorError3 = undefined;

try {
	for (var _iterator3 = entries(objkev)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
		var _step3$value = _slicedToArray(_step3.value, 2),
		    _key = _step3$value[0],
		    _value = _step3$value[1];

		console.log([_key, _value]); // ['a', 1], ['b', 2], ['c', 3]
	}
} catch (err) {
	_didIteratorError3 = true;
	_iteratorError3 = err;
} finally {
	try {
		if (!_iteratorNormalCompletion3 && _iterator3.return) {
			_iterator3.return();
		}
	} finally {
		if (_didIteratorError3) {
			throw _iteratorError3;
		}
	}
}

var obj = { one: 1, two: 2 };
var _iteratorNormalCompletion4 = true;
var _didIteratorError4 = false;
var _iteratorError4 = undefined;

try {
	for (var _iterator4 = Object.entries(obj)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
		var _step4$value = _slicedToArray(_step4.value, 2),
		    k = _step4$value[0],
		    v = _step4$value[1];

		console.log(JSON.stringify(k) + ': ' + JSON.stringify(v)); //"one": 1 "two": 2
	}
} catch (err) {
	_didIteratorError4 = true;
	_iteratorError4 = err;
} finally {
	try {
		if (!_iteratorNormalCompletion4 && _iterator4.return) {
			_iterator4.return();
		}
	} finally {
		if (_didIteratorError4) {
			throw _iteratorError4;
		}
	}
}

console.log(Object.getOwnPropertyDescriptors(bianliObj)); //返回指定对象所有自身属性（非继承属性）的描述对象
