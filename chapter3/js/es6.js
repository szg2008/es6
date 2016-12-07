/**
 * 第3章  变量解构赋值
 * ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，称为解构。
 */

/**
 * 数组的解构赋值
 * **/
//var let const都可以进行解构
var [x,y,z] = [1,2,3];
let [a,b] = [2,3];
const [c,d] = [3,4];
console.log(''+x+y+z+a+b+c+d+'');//1232334

let [aa,[bb,cc],dd] = [1,[2,3],4];
console.log(''+aa+bb+cc+dd);//1234

const [xx,,zz] = [1];
console.log(''+xx+zz);//1undefined

let [m,,n] = [1,2];
console.log(''+m+n);//1undefined

var [head,...tail] = [1,2,3,4];
console.log(head);//1
console.log(tail);//[2,3,4]

let [q,t] = [1,2,3];
console.log(''+q+t);//12

//如果等号右边的不是可遍历的解构(数组或者对象),那么将会报错
//let [arr] = false;
//let [foo] = undefined;
//console.log(arr);//error
//console.log(foo);//error

let [l,s=true] = [2];
console.log(''+l+s);//2true

const [ee,ff='ff'] = [3,null];//如果数组成员的值不是严格等于undefined，那么默认值不生效
console.log(''+ee+ff);//3null

var [gg=2,jj] = [undefined,undefined];//如果数组成员的值不是严格等于undefined，那么默认值不生效
console.log(''+gg+jj);//2undefined

let[h = 1,i = h,j = h] = [2,4];
console.log(''+h+i+j);//242


/**
 * 对象的解构赋值
 * 和数组类似
 * **/
var {foo,bar} = {foo:'aaa',bar:'bbb'};
console.log(foo + ' ' + bar);//aaa bbb

let {baz}  = {foo:'aaa',bar:'bbb'};
console.log(baz);//undefined

const {ccc:baz1} = {ccc:'cc',dd:'dd'};
console.log(baz1);//cc

let name;
({name} = {name:'name'});
console.log(name);//name

var pp = {
    p:[
        "Hello",
        {
            age:12
        }
    ]
};

let {p:[ar,{age}]} = pp;
console.log(''+ar+age);//Hello12

var {xy=3} = {};
console.log(xy);//3

let {xyz} = {xyz:11};
console.log(xyz);//11

/**
 * 字符串解构赋值
 * **/
let [tt,oo,mm] = 'szg';
console.log(''+tt+oo+mm);//szg
const {length:len} = 'Hello World';
console.log(len);//11

/**
 * 数值和布尔值的解构赋值
 * **/
let {toString:ss} = 234;
console.log(ss === Number.prototype.toString);//true
let {toString:sss} = true;
console.log(sss === Boolean.prototype.toString);//true

/**
 * 函数参数的解构赋值
 * **/
function test01([x,y]){
    console.log(x+y);
}
test01([1,2]);//3

function test02({x=0,y=0}){
    console.log(x+y);
}

test02({x:3,y:5});//8
test02({x:5});//5
test02({});//0

function test03({x,y} = {x:1,y:1}){
    console.log([x,y]);
}

test03();//[1,1]
test03({x:6});//[6,undefined]

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
map.set('first','hello');
map.set('second','world');
for(let [key,value] of map){
    console.log(key + " : " + value);
}

for(let [key,] of map){
    console.log(key);
}

for(let [,value] of map){
    console.log(value);
}