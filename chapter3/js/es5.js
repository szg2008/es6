'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/**
 * 第3章  变量解构赋值
 * ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，称为解构。
 */

/**
 * 数组的解构赋值
 * **/
//var let const都可以进行解构
var x = 1,
    y = 2,
    z = 3;
var a = 2,
    b = 3;
var c = 3,
    d = 4;

console.log('' + x + y + z + a + b + c + d + ''); //1232334

var aa = 1,
    bb = 2,
    cc = 3,
    dd = 4;

console.log('' + aa + bb + cc + dd); //1234

var _ref = [1],
    xx = _ref[0],
    zz = _ref[2];

console.log('' + xx + zz); //1undefined

var _ref2 = [1, 2],
    m = _ref2[0],
    n = _ref2[2];

console.log('' + m + n); //1undefined

var head = 1,
    tail = [2, 3, 4];

console.log(head); //1
console.log(tail); //[2,3,4]

var _ref3 = [1, 2, 3],
    q = _ref3[0],
    t = _ref3[1];

console.log('' + q + t); //12

//如果等号右边的不是可遍历的解构(数组或者对象),那么将会报错
//let [arr] = false;
//let [foo] = undefined;
//console.log(arr);//error
//console.log(foo);//error

var _ref4 = [2],
    l = _ref4[0],
    _ref4$ = _ref4[1],
    s = _ref4$ === undefined ? true : _ref4$;

console.log('' + l + s); //2true

var ee = 3,
    _ref5 = null,
    ff = _ref5 === undefined ? 'ff' : _ref5; //如果数组成员的值不是严格等于undefined，那么默认值不生效

console.log('' + ee + ff); //3null

var _undefined = undefined,
    gg = _undefined === undefined ? 2 : _undefined,
    jj = undefined; //如果数组成员的值不是严格等于undefined，那么默认值不生效

console.log('' + gg + jj); //2undefined

var _ref6 = [2, 4],
    _ref6$ = _ref6[0],
    h = _ref6$ === undefined ? 1 : _ref6$,
    _ref6$2 = _ref6[1],
    i = _ref6$2 === undefined ? h : _ref6$2,
    _ref6$3 = _ref6[2],
    j = _ref6$3 === undefined ? h : _ref6$3;

console.log('' + h + i + j); //242


/**
 * 对象的解构赋值
 * 和数组类似
 * **/
var _foo$bar = { foo: 'aaa', bar: 'bbb' },
    foo = _foo$bar.foo,
    bar = _foo$bar.bar;

console.log(foo + ' ' + bar); //aaa bbb

var _foo$bar2 = { foo: 'aaa', bar: 'bbb' },
    baz = _foo$bar2.baz;

console.log(baz); //undefined

var _ccc$dd = { ccc: 'cc', dd: 'dd' },
    baz1 = _ccc$dd.ccc;

console.log(baz1); //cc

var name = void 0;
var _name = { name: 'name' };
name = _name.name;

console.log(name); //name

var pp = {
    p: ["Hello", {
        age: 12
    }]
};

var _pp$p = _slicedToArray(pp.p, 2),
    ar = _pp$p[0],
    age = _pp$p[1].age;

console.log('' + ar + age); //Hello12

var _ref7 = {},
    _ref7$xy = _ref7.xy,
    xy = _ref7$xy === undefined ? 3 : _ref7$xy;

console.log(xy); //3

var _xyz = { xyz: 11 },
    xyz = _xyz.xyz;

console.log(xyz); //11

/**
 * 字符串解构赋值
 * **/

var _s = 's',
    _s2 = _slicedToArray(_s, 3),
    tt = _s2[0],
    oo = _s2[1],
    mm = _s2[2];

console.log('' + tt + oo + mm); //sundefinedundefined
var _HelloWorld = 'Hello World',
    len = _HelloWorld.length;

console.log(len); //11

/**
 * 数值和布尔值的解构赋值:
        解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
 * **/
var _ = 234,
    ss = _.toString;

console.log(ss); //[Function: toString]
console.log(ss === Number.prototype.toString); //true
var _true = true,
    sss = _true.toString;

console.log(sss); //[Function: toString]
console.log(sss === Boolean.prototype.toString); //true

/**
 * 函数参数的解构赋值
 * **/
function test01(_ref8) {
    var _ref9 = _slicedToArray(_ref8, 2),
        x = _ref9[0],
        y = _ref9[1];

    console.log(x + y);
}
test01([1, 2]); //3

function test02(_ref10) {
    var _ref10$x = _ref10.x,
        x = _ref10$x === undefined ? 0 : _ref10$x,
        _ref10$y = _ref10.y,
        y = _ref10$y === undefined ? 0 : _ref10$y;

    console.log(x + y);
}

test02({ x: 3, y: 5 }); //8
test02({ x: 5 }); //5
test02({}); //0

function test03() {
    var _ref11 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: 1, y: 1 },
        x = _ref11.x,
        y = _ref11.y;

    console.log([x, y]);
}

test03(); //[1,1]
test03({ x: 6 }); //[6,undefined]

/**
 * 圆括号
 * **/
/**
 *不能使用圆括号：
 * 1.变量声明语句中.eg:var [(a)] = [3];
 * 2.函数参数中.eg:function([(q)]){}
 * 3.不能将整个模式或者嵌套模式中的一层放在括号中.eg:({p:foo}) = {p:'qq'};
 *
 *
 * 可以使用圆括号：
 * 赋值语句的非模式部分可以使用圆括号    eg:[(a)] = [3]
 * **/

//遍历map
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = map[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _slicedToArray(_step.value, 2),
            key = _step$value[0],
            value = _step$value[1];

        console.log(key + " : " + value);
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
    for (var _iterator2 = map[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _step2$value = _slicedToArray(_step2.value, 1),
            key = _step2$value[0];

        console.log(key);
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
    for (var _iterator3 = map[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _step3$value = _slicedToArray(_step3.value, 2),
            value = _step3$value[1];

        console.log(value);
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

console.log('****************practice******************');
var pracA = 1,
    pracB = 44;

console.log(pracA + pracB + ''); //45

var _ref12 = [],
    _ref12$ = _ref12[0],
    pracE = _ref12$ === undefined ? true : _ref12$;

console.log(pracE); //true

var _pracC$pracD = { pracC: 12, pracD: 'hell' },
    pracC = _pracC$pracD.pracC,
    pracD = _pracC$pracD.pracD;

console.log(pracC + pracD + ''); //12hell

var _ref13 = {},
    _ref13$pracF = _ref13.pracF,
    pracF = _ref13$pracF === undefined ? 0 : _ref13$pracF;

console.log(pracF); //0

var _suzg = 'suzg',
    pracG = _suzg.length;

console.log(pracG); //4

var _2 = 221,
    pracH = _2.toString;
var _false = false,
    pracI = _false.toString;

console.log(pracH); //[Function:toString]
console.log(pracI); //[Function:toString]

function pracJ(_ref14) {
    var _ref14$x = _ref14.x,
        x = _ref14$x === undefined ? 0 : _ref14$x,
        _ref14$y = _ref14.y,
        y = _ref14$y === undefined ? 0 : _ref14$y;

    console.log(x + y);
}
pracJ({ x: 3, y: 7 });
