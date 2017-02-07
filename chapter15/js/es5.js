'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _marked = [generator1, generator2, generator3, generator5, generator10, generator11, generator12, generator13, generator14].map(regeneratorRuntime.mark);

/**
Generator函数：
	1.是一个状态机，封装了多个内部状态：yield、return等
	2.执行该函数不会返回函数的运行结果，而是返回一个遍历器生成对象Iterator，通过调用这个对象的next方法来输出函数内部定义的每一个状态
	3.写法和普通函数的区别：(1)function关键字和函数名之间有一个*;(2)函数体内部使用yield语句来定义不同的状态
**/

function generator1() {
	return regeneratorRuntime.wrap(function generator1$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					_context.next = 2;
					return 'hello';

				case 2:
					_context.next = 4;
					return 'generator';

				case 4:
					return _context.abrupt('return', '!!!');

				case 5:
				case 'end':
					return _context.stop();
			}
		}
	}, _marked[0], this);
}
var gene1 = generator1(); //生成一个遍历器对象
console.log(gene1); //GeneratorFunctionPrototype { _invoke: [Function: invoke] }
console.log(gene1.next()); //{ value: 'hello', done: false }

/**
next方法的参数：当做上一个yield语句的返回值.
注意：yield的返回值通常是undefined
	
**/
function generator2() {
	var i, reset;
	return regeneratorRuntime.wrap(function generator2$(_context2) {
		while (1) {
			switch (_context2.prev = _context2.next) {
				case 0:
					i = 0;

				case 1:
					if (!true) {
						_context2.next = 9;
						break;
					}

					_context2.next = 4;
					return i;

				case 4:
					reset = _context2.sent;

					if (reset) {
						i = -1;
					}

				case 6:
					i++;
					_context2.next = 1;
					break;

				case 9:
				case 'end':
					return _context2.stop();
			}
		}
	}, _marked[1], this);
}

var gene2 = generator2();

console.log(gene2.next()); // { value: 0, done: false }
console.log(gene2.next()); // { value: 1, done: false }
console.log(gene2.next(true)); // { value: 0, done: false }

function generator3(x) {
	var y, z;
	return regeneratorRuntime.wrap(function generator3$(_context3) {
		while (1) {
			switch (_context3.prev = _context3.next) {
				case 0:
					_context3.next = 2;
					return x + 1;

				case 2:
					_context3.t0 = _context3.sent;
					y = 2 * _context3.t0;
					_context3.next = 6;
					return y / 3;

				case 6:
					z = _context3.sent;
					return _context3.abrupt('return', x + y + z);

				case 8:
				case 'end':
					return _context3.stop();
			}
		}
	}, _marked[2], this);
}

var gene3 = generator3(5);
console.log(gene3.next()); // Object{value:6, done:false}
console.log(gene3.next()); // Object{value:NaN, done:false}
console.log(gene3.next()); // Object{value:NaN, done:true}

var gene4 = generator3(5);
console.log(gene4.next()); // { value:6, done:false }
console.log(gene4.next(12)); // { value:8, done:false }
console.log(gene4.next(13)); // { value:42, done:true }

/**
for...of循环：
	可以自动遍历Generator函数时生成的Iterator对象，不需要使用next方法
	除了for...of循环之外，...扩展运算符、解构赋值、Array.from方法内部调用，都是遍历器接口，都可以将Generator函数生成的对象，作为参数进行遍历
**/
function generator5() {
	return regeneratorRuntime.wrap(function generator5$(_context4) {
		while (1) {
			switch (_context4.prev = _context4.next) {
				case 0:
					_context4.next = 2;
					return 1;

				case 2:
					_context4.next = 4;
					return 2;

				case 4:
					return _context4.abrupt('return', 'ending');

				case 5:
				case 'end':
					return _context4.stop();
			}
		}
	}, _marked[3], this);
}

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
	for (var _iterator = generator5()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		var v = _step.value;

		console.log(v); //1 2	不包含return返回的值
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

console.log([].concat(_toConsumableArray(generator5()))); //[1,2]
console.log(Array.from(generator5())); //[1,2]

console.log(generator5());

/**
Generator.prototype.throw()
	遍历器的方法throw和全局throw有区别，前者既能在函数体内被捕获，也能在函数体外被捕获，后者只能在函数体外捕获
	如果在Generator函数内部没有部署try...catch语句，那么将在函数体外进行捕获，如果都没有部署，那么程序直接报错，中断执行

**/

var generator6 = regeneratorRuntime.mark(function generator6() {
	return regeneratorRuntime.wrap(function generator6$(_context5) {
		while (1) {
			switch (_context5.prev = _context5.next) {
				case 0:
					_context5.prev = 0;
					_context5.next = 3;
					return;

				case 3:
					_context5.next = 8;
					break;

				case 5:
					_context5.prev = 5;
					_context5.t0 = _context5['catch'](0);

					console.log('inner', _context5.t0);

				case 8:
				case 'end':
					return _context5.stop();
			}
		}
	}, generator6, this, [[0, 5]]);
});

var gene6 = generator6();
console.log(gene6.next()); //{ value: undefined, done: false }

try {
	gene6.throw('a');
	gene6.throw('b');
} catch (e) {
	console.log('outer', e);
}
//inner a
//outer b

var generator7 = regeneratorRuntime.mark(function generator7() {
	return regeneratorRuntime.wrap(function generator7$(_context6) {
		while (1) {
			switch (_context6.prev = _context6.next) {
				case 0:
					_context6.next = 2;
					return console.log('aa');

				case 2:
					_context6.next = 4;
					return console.log('bb');

				case 4:
				case 'end':
					return _context6.stop();
			}
		}
	}, generator7, this);
});

var gene7 = generator7();
gene7.next();
try {
	throw new Error('err');
} catch (e) {
	gene7.next();
}
//aa bb

/**
Generator.prototype.return():返回给定的值，并且终结遍历Generator函数,如果return参数没有参数，那么返回的value值是undefined.
	如果Generator内部有try...finally语句，那么在执行return方法的时候首先执行的是finally语句，然后再执行return
**/
var generator8 = regeneratorRuntime.mark(function generator8() {
	return regeneratorRuntime.wrap(function generator8$(_context7) {
		while (1) {
			switch (_context7.prev = _context7.next) {
				case 0:
					_context7.next = 2;
					return 2;

				case 2:
					_context7.next = 4;
					return 5;

				case 4:
					_context7.next = 6;
					return 8;

				case 6:
				case 'end':
					return _context7.stop();
			}
		}
	}, generator8, this);
});

var gene8 = generator8();
console.log(gene8.next()); //{value:1,done:false}
console.log(gene8.return('ending')); //{ value: ending, done: true }，done的值是true，代表已经终结遍历
console.log(gene8.next()); //{ value: undefined, done: true }

var generator9 = regeneratorRuntime.mark(function generator9() {
	return regeneratorRuntime.wrap(function generator9$(_context8) {
		while (1) {
			switch (_context8.prev = _context8.next) {
				case 0:
					_context8.next = 2;
					return 2;

				case 2:
					_context8.prev = 2;
					_context8.next = 5;
					return 5;

				case 5:
					_context8.prev = 5;
					_context8.next = 8;
					return 6;

				case 8:
					_context8.next = 10;
					return 8;

				case 10:
					return _context8.finish(5);

				case 11:
					_context8.next = 13;
					return 10;

				case 13:
				case 'end':
					return _context8.stop();
			}
		}
	}, generator9, this, [[2,, 5, 11]]);
});
var gene9 = generator9();
console.log(gene9.next()); //{value:2,done:false}
console.log(gene9.next()); //{value:5,done:false}
console.log(gene9.return(44)); //{value:6,done:false}
console.log(gene9.next()); //{value:8,done:false}
console.log(gene9.next()); //{value:44,done:false}

/**
yield* 语句:在一个Generator函数内部调用另外一个Generator函数
	后面的数据结构只要有Iterator接口，就会返回遍历的结果，例如：数组
**/
function generator10() {
	return regeneratorRuntime.wrap(function generator10$(_context9) {
		while (1) {
			switch (_context9.prev = _context9.next) {
				case 0:
					_context9.next = 2;
					return 3;

				case 2:
					_context9.next = 4;
					return 'starting';

				case 4:
				case 'end':
					return _context9.stop();
			}
		}
	}, _marked[4], this);
}
function generator11() {
	return regeneratorRuntime.wrap(function generator11$(_context10) {
		while (1) {
			switch (_context10.prev = _context10.next) {
				case 0:
					_context10.next = 2;
					return 5;

				case 2:
					return _context10.delegateYield(generator10(), 't0', 3);

				case 3:
					_context10.next = 5;
					return 'ending';

				case 5:
					return _context10.delegateYield(['q', 'm', 'n'], 't1', 6);

				case 6:
				case 'end':
					return _context10.stop();
			}
		}
	}, _marked[5], this);
}

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
	for (var _iterator2 = generator11()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
		var _v = _step2.value;

		console.log(_v); //5	3	starting	ending	q	m	n
	}

	/**
 	作为对象属性的Generator函数
 **/
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

var obj1 = {
	mygenerator1: regeneratorRuntime.mark(function mygenerator1() {
		return regeneratorRuntime.wrap(function mygenerator1$(_context11) {
			while (1) {
				switch (_context11.prev = _context11.next) {
					case 0:
						_context11.next = 2;
						return 1;

					case 2:
					case 'end':
						return _context11.stop();
				}
			}
		}, mygenerator1, this);
	})
};
console.log(obj1.mygenerator1().next()); //{ value: 1, done: false }

/**
Generator函数的this
	Generator函数不能跟new操作符一起使用
**/
function generator12() {
	return regeneratorRuntime.wrap(function generator12$(_context12) {
		while (1) {
			switch (_context12.prev = _context12.next) {
				case 0:
				case 'end':
					return _context12.stop();
			}
		}
	}, _marked[6], this);
}

generator12.prototype.hello = function () {
	return 'hi!';
};

var obj2 = generator12();

console.log(obj2 instanceof generator12); // true
console.log(obj2.hello()); // 'hi!'


function generator13() {
	return regeneratorRuntime.wrap(function generator13$(_context13) {
		while (1) {
			switch (_context13.prev = _context13.next) {
				case 0:
					this.a = 23;

				case 1:
				case 'end':
					return _context13.stop();
			}
		}
	}, _marked[7], this);
}

var obj3 = generator13();
console.log(obj3.a); //undefined

//利用一个空对象来辅助
function generator14() {
	return regeneratorRuntime.wrap(function generator14$(_context14) {
		while (1) {
			switch (_context14.prev = _context14.next) {
				case 0:
					this.a = 1;
					_context14.next = 3;
					return this.b = 2;

				case 3:
					_context14.next = 5;
					return this.c = 3;

				case 5:
				case 'end':
					return _context14.stop();
			}
		}
	}, _marked[8], this);
}
var obj4 = {};
var gene14 = generator14.call(obj4);

console.log(gene14.next()); // Object {value: 2, done: false}
console.log(gene14.next()); // Object {value: 3, done: false}
console.log(gene14.next()); // Object {value: undefined, done: true}
//遍历完成之后就会将Generator函数中定义的属性全部绑定在obj4上面了
console.log(obj4.a); // 1
console.log(obj4.b); // 2
console.log(obj4.c); // 3

//将gene14和obj4改成同一个对象,办法就是将obj4改成generator14.prototype
