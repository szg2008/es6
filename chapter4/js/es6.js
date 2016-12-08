/**
 * 第4章  字符串的扩展
 */

//codePointAt:返回一个字符对应的码点，适用于存储4个字节的字符
let str01 = 'aaa';
console.log(str01.codePointAt(0));//97

const str02 = '中国';
console.log(str02.codePointAt(0));//20013
console.log(str02.charCodeAt(0));//20013

for(let ch of str02){
    console.log(ch.codePointAt(0));//20013 22269
    console.log(ch.charCodeAt(0));//20013 22269
}

//测试一个字符由2个字节还是4个字节组成
function is32Bit(c){
    return c.codePointAt(0) > 0xffff;//0xffff Unicode编号的最大值
}

//String.fromCodePoint，从码点返回对应的字符,适用于4个字节的字符
console.log(String.fromCodePoint(0x20BB0));

//字符串遍历 for...of...,可以识别Unicode编号大于0xffff的字符
for(let codepoint of 'foo'){
    console.log(codepoint);//f o o
}

var text = String.fromCodePoint(0x20BB7);
for(let codepoint of text){
    console.log(codepoint);//值能正常输出
}
for(let i = 0; i < text.length;i++){
    console.log(text[i]);
}

//at和ES5中的charat方法类似
console.log('str'.charAt(0));//s
console.log('str'.at(0));//s

/**
 *
 * includes startsWith endsWith,都支持2个参数
 * 其中，endsWith表示的是前n个字符
 * includes和startsWith表示从第n个位置直到字符串结束的字符
 * **/
var s = 'Hello World';
console.log(s.includes('Hello'));//true
console.log(s.startsWith('He'));//true
console.log(s.endsWith('ld1'));//false
console.log(s.includes("World",6));//true 表示从第6个字符开始的字符是包含World的
console.log(s.startsWith('llo',2));//true 表示从第二个字符开始是以llo开头的
console.log(s.endsWith('ll',4));//true 表示前4个字符中是以ll结尾的


//repeat返回一个新的字符串，代表将原来的字符串重复n次
console.log('repeat'.repeat(3));//repeatrepeatrepeat
console.log('repeat'.repeat('2'));//repeatrepeat
console.log('repeat'.repeat(2.6));//先取整，然后再输出repeatrepeat
console.log('repeat'.repeat(NaN));//''
console.log('repeat'.repeat(-0.2));//''取整为0
//console.log('repeat'.repeat(-9.3));//error


//padStart padEnd  自动补全
console.log('x'.padStart(9,'abc'));//abcabcabx
console.log('x'.padEnd(11,'abc'));//xabcabcabca
console.log('xxx'.padStart(2,'a'));//xxx
console.log('xxx'.padEnd(2,'a'));//xxx
console.log('xxx'.padStart(5));//  xxx
console.log('xxx'.padEnd(5));//xxx

//模板字符串，使用`反引号标识
var name = "John";var addr = '北京';
console.log(`${name} comes from ${addr}`);
console.log(`${1} + ${2}`);//1+2
let str = 'return ' + '`Hello ${name}`';
let func = new Function('name',str);
console.log(func('Jack'));

//标签模板,函数被用来定义并且调用处理模板字符串
let a = 30;var b = 15;
tag`Hello ${a + b} world ${a * b}`;
function tag(stringArr,value1,value2){
    console.log(stringArr);//模板字符串中未被变量替换的部分['Hello','World','']
    console.log(stringArr.length);
    console.log(value1);//a+b 45
    console.log(value2);//a*b 450
}

var total = 30;
var msg = pass`The total is ${total} (${total * 1.20} with tax)`;
function pass(literals){
    var result = '';
    var i = 0;
    console.log(literals.raw);
    //console.log(arguments);
    //console.log(literals);
    while(i < literals.length){
        result += literals[i++];
        //console.log(result);
        if(i < arguments.length){
            result += arguments[i];
        }
    }
    return result;
}

console.log(msg);
