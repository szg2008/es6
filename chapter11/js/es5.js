'use strict';

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
**/
