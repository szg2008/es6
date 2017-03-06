'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
Class
	class定义类名、constructor定义构造函数、定义方法之间不能使用标点符号
**/
//定义类
var class1 = function () {
	function class1(x, y) {
		_classCallCheck(this, class1);

		this.x = x;
		this.y = y;
	}

	_createClass(class1, [{
		key: 'toString',
		value: function toString() {
			return '(' + this.x + ', ' + this.y + ')';
		}
	}]);

	return class1;
}();

var cls1 = new class1('hww', 'eee');
console.log(cls1.toString()); //(hww, eee)
//在实例上面调用定义的方法，实际上就是在调用原型上面的方法
console.log(typeof class1 === 'undefined' ? 'undefined' : _typeof(class1)); //function
//类的所有方法都定义在类的prototype属性上面
console.log(class1 === class1.prototype.constructor); //true

var class2 = function class2() {
	_classCallCheck(this, class2);
};

var cls2 = new class2();
console.log(cls2.constructor === class2.prototype.constructor); //true
//实例的构造方法实际上就是对象原型上面的构造方法
//使用Object.assgin定义类的方法
Object.assign(class2.prototype, {
	toString: function toString() {
		console.log('toString');
	},
	toValue: function toValue() {
		console.log('toValue');
	}
});
cls2.toString(); //toString
cls2.toValue(); //toValue


/**
constructor:
	1.类的默认方法,通过new命令符生成对象实例时，自动调用这个方法
	2.默认的返回值是this，指向当前对象，但是构造方法可以被重写
*/

var class3 = function class3() {
	_classCallCheck(this, class3);

	return Object.create(null);
};

var cls3 = new class3();
console.log(cls3 instanceof class3); //false 	默认的构造方法返回值被重写了，导致生成的实例类型不是class3


/**
类的实例对象：
	1.生成的类的实例对象必须使用new进行构造
	2.实例的属性如果不是显式的声明在本身，则都是定义在原型上面
	3.类的实例共享一个实例
	4.不存在变量提升，必须先声明，然后再使用new
	5.class表达式
**/

var class4 = function class4(x) {
	_classCallCheck(this, class4);

	this.x = x;
};

var cls4_1 = new class4(1);
var cls4_2 = new class4(2);
console.log(cls4_1.__prop__ === cls4_2.__prop__); //true  原型都是一个
//class表达式
var class5 = function () {
	function me5() {
		_classCallCheck(this, me5);
	}

	_createClass(me5, [{
		key: 'getClassName',
		value: function getClassName() {
			return me5.name;
		}
	}]);

	return me5;
}();
var cls5 = new class5();
console.log(cls5.getClassName()); //me5
//立即执行的class
var class6 = new (function () {
	function _class(name) {
		_classCallCheck(this, _class);

		this.name = name;
	}

	_createClass(_class, [{
		key: 'sayName',
		value: function sayName() {
			return this.name;
		}
	}]);

	return _class;
}())('suzg');
console.log(class6.sayName()); //suzg


/*******************类的继承**********************/
/**
1.通过extends关键字进行继承
2.在构造方法中使用super关键字调用父类的构造方法来绑定父类的this，这个是必须调用的,因为子类自己没有this对象
3.如果子类没有显式的定义构造方法，那么默认会创建一个构造方法
4.es6的继承机制是首先创造父类的实例this，所以在子类中需先调用super，然后再通过子类的构造函数修改this
5.类的prototype属性和__proto__属性:es5中，每一个对象都有一个__prop__属性，都是指向对应的构造函数的prototype属性;es6中，Class同时拥有prototype属性和__prop__属性
6.extends后面可以跟多种类型的值
***/

var subclass1 = function (_class2) {
	_inherits(subclass1, _class2);

	function subclass1(x, y, z) {
		_classCallCheck(this, subclass1);

		//调用父类的构造方法获取this对象
		var _this = _possibleConstructorReturn(this, (subclass1.__proto__ || Object.getPrototypeOf(subclass1)).call(this, x, y));

		console.log(_this); //subclass1 { x: 'z', y: 't' }
		_this.z = z;
		return _this;
	}

	_createClass(subclass1, [{
		key: 'toString',
		value: function toString() {
			return this.z + ' ' + _get(subclass1.prototype.__proto__ || Object.getPrototypeOf(subclass1.prototype), 'toString', this).call(this); //调用父类的toString方法
		}
	}]);

	return subclass1;
}(class1);

//私有方法,就是将定义的方法放在class类定义的外面。


function pri1() {}

var subcls1 = new subclass1('z', 't', 'j');
console.log(subcls1.toString()); //j (z, t)
console.log(subcls1 instanceof subclass1); //true
console.log(subcls1 instanceof class1); //true

//Object.getPrototypeOf(),判断一个类是否继承了另外一个类
console.log(Object.getPrototypeOf(subclass1) == class1); //true subclass1继承了class1
console.log(Object.getPrototypeOf(class1) == Object); //false

/**
super关键字：
	1.作为函数调用，代表父类的构造函数，执行super函数返回的是子类的实例
	2.作为对象时，指向的是父类的原型对象
	3.作为对象时，指向的是父类的原型对象，所以定义在父类实例上面的方法和属性是不能通过super访问的，只能访问定义在父类原型上面的方法和属性
	4.子类的原型的原型是父类的原型:subcls.__prop__.__prop__ = cls.__prop__
**/

var class7 = function () {
	function class7() {
		_classCallCheck(this, class7);

		this.x = 'name';
		console.log(this);
	}

	_createClass(class7, [{
		key: 'p',
		value: function p() {
			return 11;
		}
	}]);

	return class7;
}();

class7.prototype.y = 'age';

var subclass2 = function (_class3) {
	_inherits(subclass2, _class3);

	function subclass2() {
		_classCallCheck(this, subclass2);

		var _this2 = _possibleConstructorReturn(this, (subclass2.__proto__ || Object.getPrototypeOf(subclass2)).call(this));

		console.log(_get(subclass2.prototype.__proto__ || Object.getPrototypeOf(subclass2.prototype), 'p', _this2).call(_this2)); //作为对象，指向的是父类的实例,这里调用了父类的方法
		console.log(_get(subclass2.prototype.__proto__ || Object.getPrototypeOf(subclass2.prototype), 'x', _this2)); //undefined 取不到父类实例上面的属性
		console.log(_get(subclass2.prototype.__proto__ || Object.getPrototypeOf(subclass2.prototype), 'y', _this2)); //age 能取到父类定义在原型上的属性
		return _this2;
	}

	return subclass2;
}(class7);

var cls7 = new class7(); //class7 {}
var subcls2 = new subclass2(); //subclass2 {} 11

/**
原生构造函数的继承：Boolean、Number、String、Array、Date、Function、RegExp、Error、Object
	extends不仅可以用来继承类，还可以用来继承原生的构造函数;

***/

var class8 = function (_Array) {
	_inherits(class8, _Array);

	function class8() {
		var _ref;

		_classCallCheck(this, class8);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _possibleConstructorReturn(this, (_ref = class8.__proto__ || Object.getPrototypeOf(class8)).call.apply(_ref, [this].concat(args)));
	}

	return class8;
}(Array);

var cls8 = new class8();
cls8[0] = 12;
console.log(cls8); //[12]
console.log(cls8.length); //1

var class9 = function (_Object) {
	_inherits(class9, _Object);

	function class9() {
		_classCallCheck(this, class9);

		return _possibleConstructorReturn(this, (class9.__proto__ || Object.getPrototypeOf(class9)).apply(this, arguments));
	}

	return class9;
}(Object);

var cls9 = new class9({ attr: true });
console.log(cls9.attr === true); //true

/**Class的取值函数getter和存值函数setter**/

var class10 = function () {
	function class10() {
		_classCallCheck(this, class10);
	}

	_createClass(class10, [{
		key: 'prop',
		get: function get() {
			return 'getter';
		},
		set: function set(value) {
			console.log('setter' + ':' + value);
		}
	}]);

	return class10;
}();

var cls10 = new class10();
cls10.prop = 234; //setter:234
console.log(cls10.prop); //getter

//Generator方法

var class11 = function () {
	function class11() {
		_classCallCheck(this, class11);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		this.args = args;
	}

	_createClass(class11, [{
		key: Symbol.iterator,
		value: regeneratorRuntime.mark(function value() {
			var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, arg;

			return regeneratorRuntime.wrap(function value$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_iteratorNormalCompletion = true;
							_didIteratorError = false;
							_iteratorError = undefined;
							_context.prev = 3;
							_iterator = this.args[Symbol.iterator]();

						case 5:
							if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
								_context.next = 12;
								break;
							}

							arg = _step.value;
							_context.next = 9;
							return arg;

						case 9:
							_iteratorNormalCompletion = true;
							_context.next = 5;
							break;

						case 12:
							_context.next = 18;
							break;

						case 14:
							_context.prev = 14;
							_context.t0 = _context['catch'](3);
							_didIteratorError = true;
							_iteratorError = _context.t0;

						case 18:
							_context.prev = 18;
							_context.prev = 19;

							if (!_iteratorNormalCompletion && _iterator.return) {
								_iterator.return();
							}

						case 21:
							_context.prev = 21;

							if (!_didIteratorError) {
								_context.next = 24;
								break;
							}

							throw _iteratorError;

						case 24:
							return _context.finish(21);

						case 25:
							return _context.finish(18);

						case 26:
						case 'end':
							return _context.stop();
					}
				}
			}, value, this, [[3, 14, 18, 26], [19,, 21, 25]]);
		})
	}]);

	return class11;
}();

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {

	for (var _iterator2 = new class11('hello', 'world')[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
		var x = _step2.value;


		console.log(x); //hello world
	}

	//静态方法static，直接通过类来调用,子类也可以继承父类的静态方法，也可以通过子类中的super进行调用
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

var class12 = function () {
	function class12() {
		_classCallCheck(this, class12);
	}

	_createClass(class12, null, [{
		key: 'method',
		value: function method() {
			return 'static';
		}
	}]);

	return class12;
}();

console.log(class12.method()); //static

//Class的静态属性

var class13 = function class13() {
	_classCallCheck(this, class13);
};

class13.prop = 11;
console.log(class13.prop); //11

//私有属性和私有方法，前面加#
// class class14{
// 	#x = 0;
// 	constructor(x){
// 		#x;
// 	}
// }

//new.target

var class15 = function class15() {
	_classCallCheck(this, class15);

	console.log(new.target); //返回当前class，如果继承，返回子类的class
};

var subclass3 = function (_class4) {
	_inherits(subclass3, _class4);

	function subclass3() {
		_classCallCheck(this, subclass3);

		return _possibleConstructorReturn(this, (subclass3.__proto__ || Object.getPrototypeOf(subclass3)).call(this));
	}

	return subclass3;
}(class15);

var cls15 = new class15(); //[Function: class15]
var subcls15 = new subclass3(); //undefined??
