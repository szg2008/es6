'use strict';

/**
 * 第5章  正则扩展
 */

//RegExp构造函数,函数的参数允许传入一个正则表达式
var reg = new RegExp(/xyz/gi, 'g');
console.log(reg.flags); //g,按照第二个参数的模式进行匹配

//u修饰符，使用u修饰符可以处理大于4个字节的字符
console.log(/^(?:\uD83D(?![\uDC00-\uDFFF]))/.test('\uD83D\uDC2A')); //false

console.log(/^\ud83d/.test('\uD83D\uDC2A')); //true

//.修饰符，对于大于0xffff的字符，不能识别，必须加上u修饰符
console.log(/^.$/.test(String.fromCodePoint(0x20bb7))); //false
console.log(/^(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])$/.test(String.fromCodePoint(0x20bb7))); //true

//Unicode字符表示法，使用大括号表示字符表示法，添加上u修饰符才能够识别
console.log(/\u{61}/.test('a')); //false
console.log(/a/.test('a')); //true


//y修饰符
console.log('y修饰符');
var s = 'bbb_bbb_bb_b';
console.log(new RegExp('b+_', 'y').exec(s)); //[ 'bbb_', index: 0, input: 'bbb_bbb_bb_b' ]

//lastIndex
var REGEX = /a/g;
REGEX.lastIndex = 3;
var match = REGEX.exec('qswaacd');
console.log(match);
console.log(match.index);
console.log(match.input);
console.log(REGEX.lastIndex);

//y修饰符中使用lastIndex,y修饰符隐含了头部匹配的标志^,必须是在指定的位置发现匹配才算匹配成功

var REGEXY = new RegExp('a', 'y');
REGEXY.lastIndex = 4;
var matchY = REGEXY.exec('qswaacd');
console.log(matchY);
console.log(matchY.index);
console.log(matchY.input);
console.log(REGEXY.lastIndex);

//split replace
console.log('@@x@'.split(new RegExp('@', 'y'))); //[ '', '', 'x@' ]
console.log('aaxa'.replace(new RegExp('a', 'gy'), '=')); //==xa

//sticky属性：返回是否设置了y修饰符
console.log(new RegExp('hello', 'y').sticky); //true

//flags属性，返回正则表达式的修饰符
console.log(new RegExp('abc', 'giy').flags);
