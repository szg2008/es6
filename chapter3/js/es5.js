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

var _szg = 'szg',
    _szg2 = _slicedToArray(_szg, 3),
    tt = _szg2[0],
    oo = _szg2[1],
    mm = _szg2[2];

console.log('' + tt + oo + mm); //szg
var _HelloWorld = 'Hello World',
    len = _HelloWorld.length;

console.log(len); //11

/**
 * 数值和布尔值的解构赋值
 * **/
var _ = 234,
    ss = _.toString;

console.log(ss === Number.prototype.toString); //true
var _true = true,
    sss = _true.toString;

console.log(sss === Boolean.prototype.toString); //true

/**
 * 函数参数的解构赋值
 * **/
