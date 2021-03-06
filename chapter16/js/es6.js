/**
Generator函数的异步应用：
	
**/

function* gen(x){
  try {
    var y = yield x + 2;
  } catch (e){
    console.log(e);
  }
  return y;
}

var g = gen(1);
console.log(g.next());//{ value: 3, done: false }
console.log(g.throw('出错了'));//出错了	{ value: undefined, done: true }


/**
	Thunk函数：将参数放到一个临时函数中，再将这个临时函数传入函数体，这个临时函数叫做Thunk函数
		在Javascript中，Thunk函数用来代替的是多参数函数
		Thunk可以使Generator函数自动执行
**/

function thunk1(){
	return 3 + 6;
}
function fun1(m){
	return Math.max(m,7);
}

console.log(fun1(thunk1()));//9	将函数的参数用Thunk函数代替

//Thunk函数转换器
var Thunk = function(fn) {
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback);
    }
  };
};

/***co模块：用于Generator自动执行*/

