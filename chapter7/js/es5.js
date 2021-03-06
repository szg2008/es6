'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/**
 * 数组的扩展
 *      Array.from
 *      Array.of
 *      Array.copyWithin
 *      Array.find
 *      Array.findIndex
 *      Array.fill
 *      Array.entries
 *      Array.keys
 *      Array.values
 *      Array.includes
 */

/**
 * Array.from:
 *      将类似数组的对象和可迭代的对象转化为真正的数组对象
 *      任何有length属性的对象都可以使用Array.from转化为真正的数组
 *      扩展运算符...，也可以将某些数据结构转化为数组 ****
 *      接受第二个参数，用来对每个数组元素进行处理
 * **/
var obj = {
  '0': 'name',
  '1': 'age',
  '2': 'addr',
  length: 3
};
console.log(Array.from(obj)); //[ 'name', 'age', 'addr' ]
console.log(Array.from('hello'));
console.log(Array.from({ length: 3 }));
Array.from(obj, function (item) {
  console.log(item + ' world!');
});

//window.onload = function(){
//    "use strict";
//    //NodeList对象,使用Array.from转化为数组
//    let nodelist = document.querySelectorAll('li');
//    console.log(Array.from(nodelist));
//    console.log([...nodelist]);
//    Array.from(nodelist,function(item){
//        console.log(item.className);
//    });
//};

/**
 * Array.of
 *      用于将一组值转换为数组
 *      它总是返回参数值组成的数组，如果参数为空，则返回一个空数组
 *      方法可以使用[].slice.call(arguments)模拟
 * **/
console.log(Array.of(1, 3, 4)); //[1,3,4]
console.log(Array.of(3)); //[3]
console.log(Array.of()); //[]
console.log(Array.of(2, 4, 6, 7).length); //4

/**
 * Array.copyWithin
 *      在当前数组内部将指定位置的成员复制到其他位置,并且覆盖这个位置的值
 *      params:
 *          target(必填)：从该位置开始替换数据
 *          start(选填)：从该位置开始读取数据
 *          end(选填)：到该位置前停止读取数据
 * **/
console.log([1, 2, 3, 4, 5].copyWithin(0, 3, 4));
console.log([1, 2, 3, 4, 5].copyWithin(0, 3));
console.log([1, 2, 3, 4, 5].copyWithin(1, -2, -1)); //负数从后往前，或者先加一个数组的长度变成整数，然后再替换

/**
 * Array.find、Array.findIndex
 *      find：找出第一个符合条件的数组成员
 *      findIndex：返回第一个符合条件的数组成员的位置，否则返回-1
 * **/

var find = [0, 9, -1, 3].find(function (item) {
  "use strict";

  return item < 0;
});
console.log(find); //-1

var findIndex = [2, -5, 9, 6].findIndex(function (item) {
  return item > 7;
});
console.log(findIndex); //2

/****
 * Array.fill:
 *      给定值，然后填充数组,如果数组中本身有值，那么直接覆盖，可以接受第二第三个参数，用来指定开始位置和结束位置
 */
console.log(new Array(3).fill(7)); //[7,7,7]
console.log(['a', 'b', 'c', 'd'].fill(8, 2, 4)); //['a','b',8,8]

/**
 * for...of遍历
 * entries(),values(),keys()
 * 也可以使用next()方法进行遍历
 * **/
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = ['c', 'd'].entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var _step$value = _slicedToArray(_step.value, 2),
        index = _step$value[0],
        elem = _step$value[1];

    console.log(index, elem);
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
  for (var _iterator2 = ['c', 'd'].keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var index = _step2.value;

    console.log(index);
  }
  //for(let elem of ["a", "b", "c"].values()){
  //    console.log(elem);
  //}

  /**
   * includes()
   *      表示某个数值是否包含给定的值，第二个参数表示起始位置
   *
   * */
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

console.log([1, 3, 4].includes(3)); //true

/**
 * 空位：
 *  空位不是undefined
 *  0 in [,,] //false 说明下标为0的地方是没有值的
 *  0 in [undefined,1] //true
 *  ES6中新增的方法会将空位处理成undefined
 * **/
console.log(0 in [,,]);
console.log(0 in [undefined, 1]);
