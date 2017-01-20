'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/***
Iterator和for...of循环
	1.es6中规定，默认的Iterator接口部署在数据结构的Symbol.iterator属性中，一个数据结构中只要有Symbol.iterator属性，那么久认为是可以遍历的。
	2.默认原生就部署Iterator接口的数据结构有三类:数组、某些类似数组的对象、Map和Set结构
	3.字符串的Iterator接口
	4.遍历器对象的return()和throw(),自定义一个遍历器对象函数，next()是必须的，return和throw是可选的。return方法一般用在没有完成遍历之前，需要提前退出的情况
*/
//模拟Iterator
var iter1 = ['a', 'b', 'c'];
function makeIterator(array) {
	var nextIndex = 0;
	return {
		next: function next() {
			return nextIndex < array.length ? { value: array[nextIndex++], done: false } : { value: undefined, done: true };
		}
	};
}
var it1 = makeIterator(iter1);
console.log(it1.next()); //{ value: 'a', done: false }
console.log(it1.next()); //{ value: 'b', done: false }

var iter2 = [1, 3, 5, 7];
var it2 = iter2[Symbol.iterator](); //数组本身就具有这个属性，所以部署上去，就能够得到遍历器对象
console.log(it2.next()); //{ value: 1, done: false }

//调用Iterator接口的场合
//1.解构赋值:对数组或者Set进行解构赋值时，会默认调用Symbol.iterator方法.
var iter3 = new Set().add('a').add('b');

var _iter = _slicedToArray(iter3, 2),
    x = _iter[0],
    y = _iter[1];

console.log([x, y]); //['a','b']
//2.扩展运算符也会调用默认的iterator
var iter4 = 'HELLO WORLD!!!';
console.log([].concat(_toConsumableArray(iter4))); //[ 'H', 'E', 'L', 'L', 'O', ' ', 'W', 'O', 'R', 'L', 'D', '!', '!', '!' ]
//3.yield*:后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口
var iter5 = regeneratorRuntime.mark(function iter5() {
	return regeneratorRuntime.wrap(function iter5$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					_context.next = 2;
					return 1;

				case 2:
					return _context.delegateYield([2, 3, 6], 't0', 3);

				case 3:
					_context.next = 5;
					return 8;

				case 5:
				case 'end':
					return _context.stop();
			}
		}
	}, iter5, this);
});

var it3 = iter5();
console.log(it3.next()); //{ value: 1, done: false }

//字符串:字符串是一个类似数组的对象，所以也具有Iterator接口
var iter6 = 'xiaohong';
console.log(iter6[Symbol.iterator]); //[Function: [Symbol.iterator]]
var it4 = iter6[Symbol.iterator]();
console.log(it4.next()); //{ value: 'x', done: false }

/********
for...of循环:只要部署了Iterator接口，就可以使用这个循环
	数组
	Set和Map结构
*****/
//数组
var iter7 = ['red', 'green', 'blue'];

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
	for (var _iterator = iter7[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		var v = _step.value;

		console.log(v); // red green blue
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

var iter8 = {};
iter8[Symbol.iterator] = iter7[Symbol.iterator].bind(iter7);

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
	for (var _iterator2 = iter8[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
		var _v = _step2.value;

		console.log(_v); // red green blue
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
