'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _obj2;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
Symbol:
	1.在es5的基础上，添加了一个原始数据类型Symbol.前6种是：Undefined、Null、Boolean、String、Array、Object。
	2.属性名属于Symbol类型的，就都是独一无二的，可以保证不和其他属性名冲突
	3.Symbol不能和其他类型的数据进行运算
	4.Symbol可以显示的转换为字符串和布尔值
	5.内置的Symbol值
**/

var s1 = Symbol();
console.log(typeof s1 === 'undefined' ? 'undefined' : _typeof(s1)); //symbol

var s2 = Symbol('a'); //字符串参数表示对Symbol实例的描述
var s3 = Symbol({ a: '1' }); //如果参数是对象，会首先调用toString方法转化成字符串
var CONT = {
  toString: function toString() {
    return 'aa';
  }
};
console.log(s3); //Symbol([object Object])
console.log(Symbol(CONT)); //Symbol(aa)
var s4 = Symbol('a');
console.log(s2 === s4); //false	s2和s4都是Symbol的返回值，并且参数相同，但是它们是不相等的
console.log(String(s1)); //Symbol()
console.log(Boolean(s2)); //true

//作为属性名,必须使用[]
var s5 = Symbol();
var obj1 = {};
obj1[s5] = "Hello";
console.log(obj1[s5]); //Hello
var obj2 = _defineProperty({}, s5, function (args) {
  return args;
});
console.log(obj2[s5]('abc')); //abc

//属性名的遍历:只能使用Object.getOwnPropertySymbols()或者Reflect.ownKeys()
var obj3 = (_obj2 = {}, _defineProperty(_obj2, s1, 'aa'), _defineProperty(_obj2, s2, 'bb'), _defineProperty(_obj2, 'qt', 'cc'), _obj2);
console.log(Object.getOwnPropertySymbols(obj3)); //[ Symbol(), Symbol(a) ]
console.log(Reflect.ownKeys(obj3)); //[ 'qt', Symbol(), Symbol(a) ]

//Symbol.for,Symbol.keyFor，确保使用的是同一个Symbol值
//Symbol.for:接受一个字符串作为参数，首先搜索有没有以该参数作为名称的Symbol值，如果有，就返回这个值，如果没有那么创建一个以这个字符串为名称的Symbol值
var s6 = Symbol.for('a');
var s7 = Symbol.for('a');
console.log(s6 === s7); //true
//Symbol.keyFor:返回一个已经登记的Symbol类型值的key
console.log(Symbol.keyFor(s6)); //a
console.log(Symbol.keyFor(s2)); //undefined	Symbol定义的属于未被登记的，所以返回undefined

//内置的Symbol值

//(1)Symbol.hasInstance:指向一个内部方法。当其他对象使用instanceof运算符，判断是否为该对象的实例时，调用这个方法

var MyClassInstance = function () {
  function MyClassInstance() {
    _classCallCheck(this, MyClassInstance);
  }

  _createClass(MyClassInstance, [{
    key: Symbol.hasInstance,
    value: function value(foo) {
      return foo instanceof Array;
    }
  }]);

  return MyClassInstance;
}();

console.log([1, 2, 3] instanceof new MyClassInstance()); // true

//(2)Symbol.isConcatSpreadable:布尔值，表示对象使用Array.prototype.concat()方法时，是否可以展开
var arr1 = ['a', 'b'];
console.log(['c', 'd'].concat(arr1, 'e')); //[ 'c', 'd', 'a', 'b', 'e' ]
console.log(arr1[Symbol.isConcatSpreadable]); //undefined	Symbol.isConcatSpreadable=true/undefined时代表可以展开
var arr2 = ['w', 's'];
arr2[Symbol.isConcatSpreadable] = false; //设置数组在合并时不可展开
console.log(['v'].concat(arr2)); //[ 'v', [ 'w', 's' ] ]

//(3)Symbol.species:指向当前对象的构造函数，创建实例时，默认会调用这个方法，使用这个属性返回的函数当作构造函数，来创建实例对象

var MyArray = function (_Array) {
  _inherits(MyArray, _Array);

  function MyArray() {
    _classCallCheck(this, MyArray);

    return _possibleConstructorReturn(this, (MyArray.__proto__ || Object.getPrototypeOf(MyArray)).apply(this, arguments));
  }

  _createClass(MyArray, null, [{
    key: Symbol.species,

    // 覆盖父类 Array 的构造函数
    get: function get() {
      return Array;
    } //使用Symbol.species返回的函数来创建MyArray的实例

  }]);

  return MyArray;
}(Array);

var myArray = new MyArray(1, 2);
console.log(myArray); //[1,2]

//(4)Symbol.match:对象的Symbol.match属性，指向一个函数。当执行str.match(myObject)时，如果该属性存在，会用它，返回该方法的返回值

var MyMatcher = function () {
  function MyMatcher() {
    _classCallCheck(this, MyMatcher);
  }

  _createClass(MyMatcher, [{
    key: Symbol.match,
    value: function value(string) {
      return 'hello world'.indexOf(string);
    }
  }]);

  return MyMatcher;
}();

console.log('e'.match(new MyMatcher())); // 1

//(5)Symbol.replace:对象的Symbol.replace属性，指向一个方法，当该对象被String.prototype.replace方法调用时，会返回该方法的返回值
var repalce = {};
repalce[Symbol.replace] = function () {
  for (var _len = arguments.length, s = Array(_len), _key = 0; _key < _len; _key++) {
    s[_key] = arguments[_key];
  }

  return console.log(s);
};
'Hello'.replace(repalce, 'World'); // ["Hello", "World"]

//(6)Symbol.search:对象的Symbol.search属性，指向一个方法，当该对象被String.prototype.search方法调用时，会返回该方法的返回值

var MySearch = function () {
  function MySearch(value) {
    _classCallCheck(this, MySearch);

    this.value = value;
  }

  _createClass(MySearch, [{
    key: Symbol.search,
    value: function value(string) {
      return string.indexOf(this.value);
    }
  }]);

  return MySearch;
}();

console.log('foobar'.search(new MySearch('foo'))); // 0

//(7)Symbol.split:对象的Symbol.split属性，指向一个方法，当该对象被String.prototype.split方法调用时，会返回该方法的返回值

var MySplitter = function () {
  function MySplitter(value) {
    _classCallCheck(this, MySplitter);

    this.value = value;
  }

  _createClass(MySplitter, [{
    key: Symbol.split,
    value: function value(string) {
      var index = string.indexOf(this.value);
      if (index === -1) {
        return string;
      }
      return [string.substr(0, index), string.substr(index + this.value.length)];
    }
  }]);

  return MySplitter;
}();

console.log('foobar'.split(new MySplitter('foo'))); // ['', 'bar']
console.log('foobar'.split(new MySplitter('bar'))); // ['foo', '']
console.log('foobar'.split(new MySplitter('baz'))); // 'foobar'

//(8)Symbol.iterator:对象的Symbol.iterator属性，指向该对象的默认遍历器方法。

var Collection = function () {
  function Collection() {
    _classCallCheck(this, Collection);
  }

  _createClass(Collection, [{
    key: Symbol.iterator,
    value: regeneratorRuntime.mark(function value() {
      var i;
      return regeneratorRuntime.wrap(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              i = 0;

            case 1:
              if (!(this[i] !== undefined)) {
                _context.next = 7;
                break;
              }

              _context.next = 4;
              return this[i];

            case 4:
              ++i;
              _context.next = 1;
              break;

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, value, this);
    })
  }]);

  return Collection;
}();

var myCollection = new Collection();
myCollection[0] = 1;
myCollection[1] = 2;

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = myCollection[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var _value = _step.value;

    console.log(_value); //1 2
  }

  //(9)Symbol.toPrimitive:对象的Symbol.toPrimitive属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值
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

var objtoPrimitive = _defineProperty({}, Symbol.toPrimitive, function (hint) {
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
});
console.log(2 * objtoPrimitive); // 246
console.log(3 + objtoPrimitive); // '3default'
console.log(objtoPrimitive == 'default'); // true
console.log(String(objtoPrimitive)); // 'str'

//(10)Symbol.toStringTag:对象的Symbol.toStringTag属性，指向一个方法。在该对象上面调用Object.prototype.toString方法时，如果这个属性存在，它的返回值会出现在toString方法返回的字符串之中，表示对象的类型。也就是说，这个属性可以用来定制[object Object]或[object Array]中object后面的那个字符串。
console.log(_defineProperty({}, Symbol.toStringTag, 'Foo').toString()); // "[object Foo]"

var CollectionTag = function () {
  function CollectionTag() {
    _classCallCheck(this, CollectionTag);
  }

  _createClass(CollectionTag, [{
    key: Symbol.toStringTag,
    get: function get() {
      return 'xxx';
    }
  }]);

  return CollectionTag;
}();

var xTag = new CollectionTag();
console.log(Object.prototype.toString.call(xTag)); // "[object xxx]"

//(11)Symbol.unscopables:对象的Symbol.unscopables属性，指向一个对象。该对象指定了使用with关键字时，哪些属性会被with环境排除。
