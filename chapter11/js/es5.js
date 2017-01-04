'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
[12, 3, 45, 6, 3, 3, 12].map(function (x) {
	return s1.add(x);
});
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
	for (var _iterator = s1[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		var key = _step.value;

		console.log(key); //12 3 45 6
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

var s2 = new Set([1, 3, 4, 5, 5, 3]);
console.log(s2.size); //4	直接去重
console.log(s2); //Set { 1, 3, 4, 5 }
console.log([].concat(_toConsumableArray(s2))); //[ 1, 3, 4, 5 ]
s2.add({});
console.log(s2.size); //5
s2.add({});
console.log(s2.size); //6
console.log([].concat(_toConsumableArray(s2))); //[ 1, 3, 4, 5, {}, {} ]
s2.delete(3);
console.log([].concat(_toConsumableArray(s2))); //[ 1, 4, 5, {}, {} ]
console.log(s2.has(1)); //true
//去除数组中重复成员的一种方法！！！
var dedupe = function dedupe(array) {
	return Array.from(new Set(array));
};
console.log(dedupe([1, 3, 4, 6, 7, 8, 3, 1, 4])); //去重，Array.from能将Set结构的数据转化成数组	[1,3,4,6,7,8]
//Set遍历
var s3 = new Set(['red', 'blue', 'yellow']);
var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
	for (var _iterator2 = s3.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
		var _key = _step2.value;

		console.log(_key); //red blue yellow
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
	for (var _iterator3 = s3.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
		var _key2 = _step3.value;

		console.log(_key2); //red blue yellow
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

var _iteratorNormalCompletion4 = true;
var _didIteratorError4 = false;
var _iteratorError4 = undefined;

try {
	for (var _iterator4 = s3.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
		var _key3 = _step4.value;

		console.log(_key3); //[ 'red', 'red' ][ 'blue', 'blue' ][ 'yellow', 'yellow' ]
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

var _iteratorNormalCompletion5 = true;
var _didIteratorError5 = false;
var _iteratorError5 = undefined;

try {
	for (var _iterator5 = s3[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
		var _key4 = _step5.value;
		//可以直接使用Set进行遍历
		console.log(_key4); //red blue yellow
	}
} catch (err) {
	_didIteratorError5 = true;
	_iteratorError5 = err;
} finally {
	try {
		if (!_iteratorNormalCompletion5 && _iterator5.return) {
			_iterator5.return();
		}
	} finally {
		if (_didIteratorError5) {
			throw _iteratorError5;
		}
	}
}

s3.forEach(function (key, value) {
	return console.log(value + ' susu');
}); //red susu	blue susu	yellow susu


/**
WeakSet:
	1.和Set结构类似
	2.成员只能是对象，不能是其他类型的数据
	3.不可遍历，没有forEach方法和size属性
	4.有add、delete、has方法
**/
var s4 = [{ 'name': 'hong' }, { 'addr': 'beijing' }];
var s5 = [1, 3];
var weakSet1 = new WeakSet(s4);
console.log(weakSet1); //WeakSet {}
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
var m1 = new Map();
var o1 = { p: "Hello Map" };
m1.set(o1, 'content');
console.log(m1); //Map { { p: 'Hello Map' } => 'content' }
console.log(m1.get(o1)); //content
console.log(m1.has(o1)); //true
m1.delete(o1);
console.log(m1.get(o1)); //undefined
var m2 = new Map([['name', 'xiaohong'], ['addr', 'beijing'], ['gender', '1']]);
console.log(m2.get('name')); //xiaohong

m2.set('name', 'tom'); //对同一个键值多次赋值
console.log(m2.get('name')); //tom
var k1 = ['a'],
    k2 = ['a'];
m2.set(k1, '111');
m2.set(k2, '222');
console.log(m2.get(k1)); //111
console.log(m2.get(k2)); //222
m2.set(NaN, 234);
console.log(m2.get(NaN)); //234

console.log(m2.size); //6

var _iteratorNormalCompletion6 = true;
var _didIteratorError6 = false;
var _iteratorError6 = undefined;

try {
	for (var _iterator6 = m2.keys()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
		var _key5 = _step6.value;

		console.log(_key5); //name addr gender [ 'a' ] [ 'a' ] NaN
	}
} catch (err) {
	_didIteratorError6 = true;
	_iteratorError6 = err;
} finally {
	try {
		if (!_iteratorNormalCompletion6 && _iterator6.return) {
			_iterator6.return();
		}
	} finally {
		if (_didIteratorError6) {
			throw _iteratorError6;
		}
	}
}

var _iteratorNormalCompletion7 = true;
var _didIteratorError7 = false;
var _iteratorError7 = undefined;

try {
	for (var _iterator7 = m2.values()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
		var value = _step7.value;

		console.log(value); //tom beijing 1 111 222 234
	}
} catch (err) {
	_didIteratorError7 = true;
	_iteratorError7 = err;
} finally {
	try {
		if (!_iteratorNormalCompletion7 && _iterator7.return) {
			_iterator7.return();
		}
	} finally {
		if (_didIteratorError7) {
			throw _iteratorError7;
		}
	}
}

var _iteratorNormalCompletion8 = true;
var _didIteratorError8 = false;
var _iteratorError8 = undefined;

try {
	for (var _iterator8 = m2.entries()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
		var _step8$value = _slicedToArray(_step8.value, 2),
		    _key6 = _step8$value[0],
		    _value = _step8$value[1];

		console.log(_key6, _value); //name tom  addr beijing  gender 1  [ 'a' ] '111'  [ 'a' ] '222'  NaN 234
	}
} catch (err) {
	_didIteratorError8 = true;
	_iteratorError8 = err;
} finally {
	try {
		if (!_iteratorNormalCompletion8 && _iterator8.return) {
			_iterator8.return();
		}
	} finally {
		if (_didIteratorError8) {
			throw _iteratorError8;
		}
	}
}

var _iteratorNormalCompletion9 = true;
var _didIteratorError9 = false;
var _iteratorError9 = undefined;

try {
	for (var _iterator9 = m2[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
		var item = _step9.value;

		console.log(item); //[ 'name', 'tom' ]	[ 'addr', 'beijing' ]	[ 'gender', '1' ]	[ [ 'a' ], '111' ]	[ [ 'a' ], '222' ]	[ NaN, 234 ]
	}

	//Map结构转化成数组结构，使用...扩展符
} catch (err) {
	_didIteratorError9 = true;
	_iteratorError9 = err;
} finally {
	try {
		if (!_iteratorNormalCompletion9 && _iterator9.return) {
			_iterator9.return();
		}
	} finally {
		if (_didIteratorError9) {
			throw _iteratorError9;
		}
	}
}

console.log([].concat(_toConsumableArray(m2.keys()))); //[ 'name', 'addr', 'gender', [ 'a' ], [ 'a' ], NaN ]
console.log([].concat(_toConsumableArray(m2.values()))); //[ 'tom', 'beijing', '1', '111', '222', 234 ]
console.log([].concat(_toConsumableArray(m2.entries()))); //[ [ 'name', 'tom' ],[ 'addr', 'beijing' ],[ 'gender', '1' ],[ [ 'a' ], '111' ],[ [ 'a' ], '222' ],[ NaN, 234 ] ]


//Map与其他数据结构的相互转换
//1.Map转化为数组,使用扩展符
var m3 = new Map().set('foo', 4).set(['a'], 'baz').set(NaN, 123);
console.log(m3); //Map { 'foo' => 4, [ 'a' ] => 'baz', NaN => 123 }
console.log([].concat(_toConsumableArray(m3))); //[ [ 'foo', 4 ], [ [ 'a' ], 'baz' ], [ NaN, 123 ] ]
//2.数组转化为Map,将数组传入Map的构造函数中就转化成Map了
console.log(new Map([[1, 3], { 'name': 'john' }, ['ab']])); //Map { 1 => 3, undefined => undefined, 'ab' => undefined }
//3.Map转化为对象
function strMapToObj(strMap) {
	var obj = Object.create(null);
	var _iteratorNormalCompletion10 = true;
	var _didIteratorError10 = false;
	var _iteratorError10 = undefined;

	try {
		for (var _iterator10 = strMap[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
			var _step10$value = _slicedToArray(_step10.value, 2),
			    k = _step10$value[0],
			    v = _step10$value[1];

			obj[k] = v;
		}
	} catch (err) {
		_didIteratorError10 = true;
		_iteratorError10 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion10 && _iterator10.return) {
				_iterator10.return();
			}
		} finally {
			if (_didIteratorError10) {
				throw _iteratorError10;
			}
		}
	}

	return obj;
}

var myMap1 = new Map().set('yes', true).set('no', false);
console.log(strMapToObj(myMap1)); //{ yes: true, no: false }
//4.对象转化为Map
function objToStrMap(obj) {
	var strMap = new Map();
	var _iteratorNormalCompletion11 = true;
	var _didIteratorError11 = false;
	var _iteratorError11 = undefined;

	try {
		for (var _iterator11 = Object.keys(obj)[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
			var k = _step11.value;

			strMap.set(k, obj[k]);
		}
	} catch (err) {
		_didIteratorError11 = true;
		_iteratorError11 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion11 && _iterator11.return) {
				_iterator11.return();
			}
		} finally {
			if (_didIteratorError11) {
				throw _iteratorError11;
			}
		}
	}

	return strMap;
}
console.log(objToStrMap({ yes: true, no: false })); //Map { 'yes' => true, 'no' => false }
//5.Map转化为Json,一种是键都是字符串，直接转成JSON，另一种是键含有其他类型的值，转化成JSON数组
function strMapToJson(strMap) {
	return JSON.stringify(strMapToObj(strMap));
}

var myMap2 = new Map().set('yes', true).set('no', false);
console.log(strMapToJson(myMap2)); //{"yes":true,"no":false}

function mapToArrayJson(map) {
	return JSON.stringify([].concat(_toConsumableArray(map)));
}

var myMap3 = new Map().set(true, 7).set({ foo: 3 }, ['abc']);
console.log(mapToArrayJson(myMap3)); //[[true,7],[{"foo":3},["abc"]]]
//6.JSON转化成Map
function jsonToStrMap(jsonStr) {
	return objToStrMap(JSON.parse(jsonStr));
}
console.log(jsonToStrMap('{"yes":true,"no":false}')); //Map { 'yes' => true, 'no' => false }

function jsonToMap(jsonStr) {
	return new Map(JSON.parse(jsonStr));
}
console.log(jsonToMap('[[true,7],[{"foo":3},["abc"]]]')); //Map { true => 7, { foo: 3 } => [ 'abc' ] }
/**
WeakMap:
	类似Map，唯一区别就是，只接受对象作为键名
	只有set get delete has四个方法可以使用
**/
var wm1 = new WeakMap().set([1, 2], 'weakmap');
console.log(wm1);
