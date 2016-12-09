/**
 * 第5章  正则扩展
 */

//RegExp构造函数,函数的参数允许传入一个正则表达式
let reg = new RegExp(/xyz/gi,'g');
console.log(reg.flags);//g,按照第二个参数的模式进行匹配

//u修饰符，使用u修饰符可以处理大于4个字节的字符
console.log(/^\ud83d/u.test('\ud83d\udc2a'));//false

console.log(/^\ud83d/.test('\ud83d\udc2a'));//true

//.修饰符，对于大于0xffff的字符，不能识别，必须加上u修饰符
console.log(/^.$/.test(String.fromCodePoint(0x20bb7)));//false
console.log(/^.$/u.test(String.fromCodePoint(0x20bb7)));//true

//Unicode字符表示法，使用大括号表示字符表示法，添加上u修饰符才能够识别
console.log(/\u{61}/.test('a'));//false
console.log(/\u{61}/u.test('a'));//true


//y修饰符
console.log('y修饰符');
let s = 'bbb_bbb_bb_b';
console.log(/b+_/y.exec(s));//[ 'bbb_', index: 0, input: 'bbb_bbb_bb_b' ]

//lastIndex
const REGEX = /a/g;
REGEX.lastIndex = 3;
let match = REGEX.exec('qswaacd');
console.log(match);
console.log(match.index);
console.log(match.input);
console.log(REGEX.lastIndex);

//y修饰符中使用lastIndex,y修饰符隐含了头部匹配的标志^,必须是在指定的位置发现匹配才算匹配成功

const REGEXY = /a/y;
REGEXY.lastIndex = 4;
let matchY = REGEXY.exec('qswaacd');
console.log(matchY);
console.log(matchY.index);
console.log(matchY.input);
console.log(REGEXY.lastIndex);

//split replace
console.log('@@x@'.split(/@/y));//[ '', '', 'x@' ]
console.log('aaxa'.replace(/a/gy,'='));//==xa

//sticky属性：返回是否设置了y修饰符
console.log(/hello/y.sticky);//true

//flags属性，返回正则表达式的修饰符
console.log(/abc/giy.flags);//giy

