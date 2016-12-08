'use strict';

/**
 * 第4章  字符串的扩展
 */

//codePointAt:返回一个字符对应的码点，适用于存储4个字节的字符
var str01 = 'aaa';
console.log(str01.codePointAt(0)); //97

var str02 = '中国';
console.log(str02.codePointAt(0)); //20013
console.log(str02.charCodeAt(0)); //20013

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = str02[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var ch = _step.value;

        console.log(ch.codePointAt(0)); //20013 22269
        console.log(ch.charCodeAt(0)); //20013 22269
    }

    //测试一个字符由2个字节还是4个字节组成
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

function is32Bit(c) {
    return c.codePointAt(0) > 0xffff; //0xffff Unicode编号的最大值
}

//String.fromCodePoint，从码点返回对应的字符,适用于4个字节的字符
console.log(String.fromCodePoint(0x20BB0));

//字符串遍历 for...of...,可以识别Unicode编号大于0xffff的字符
var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
    for (var _iterator2 = 'foo'[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var codepoint = _step2.value;

        console.log(codepoint); //f o o
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

var text = String.fromCodePoint(0x20BB7);
var _iteratorNormalCompletion3 = true;
var _didIteratorError3 = false;
var _iteratorError3 = undefined;

try {
    for (var _iterator3 = text[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _codepoint = _step3.value;

        console.log(_codepoint); //值能正常输出
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

for (var i = 0; i < text.length; i++) {
    console.log(text[i]);
}

//at和ES5中的charat方法类似
console.log('str'.charAt(0));
console.log('str'.at(0));
