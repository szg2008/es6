/**
async函数：
	1.在Generator函数的基础上，＊改成async，yield改成await，仅此而已
	2.针对Genarator的改进，体现在几个方面：
		(1)内置执行器：函数async的执行和普通函数一样，只需要调用一下即可使用，不必使用next方法
		(2)语义更加清晰：async表示该函数里面有异步操作，await表示需要等待才能进行下一步结果
		(3)适用性更广：await后面可以跟Promise对象或者原始的数据类型
		(4)async返回Promise对象，可以直接使用then方法进行后续的操作
**/
//Node环境还没有完全支持async
// var async = require('asyncawait/async');
// var await = require('asyncawait/await');

// async function asyncPrint(value, ms) {
//   await (timeout(ms));
//   console.log(value);
// };

// function timeout(ms){
// 	return new Promise((resolve) =>{
// 		setTimeout(resolve,ms);
// 	});
// }

// asyncPrint('hello async func',2000);

//多种用法
//1.函数声明
// async function foo(){}

//2.函数表达式
// const foo = function(){}

//3.对象的方法
// let obj = {
// 	async fun(){}
// };
// obj.fun.then();

/**
语法:
	1.async return回来的值是作为返回的Promise对象所带的参数值
	2.抛出的错误，导致返回的Promise对象的状态变成了reject状态
	3.返回的Promise对象，必须等到async函数内部所有的await执行完毕，才能执行then方法
**/
async function asy1(){
	return 'Hello World asy1';
}
asy1().then(par1=>console.log(par1));//Hello World asy1

/**
await:
	1.await后面紧跟的是一个Promise对象，如果不是，那么会自动转化成Promise对象
	2.await后面跟的Promise对象返回的状态如果是reject，那么会自动被catch中的回调函数接收到
	3.只要有一个Promise的状态是reject，那么整个函数就会中断执行，一种办法就是将await使用try...catch；另外一种就是在每个await后面添加一个catch方法
	4.多个异步操作，如果他们之间没有必然的联系，也就是不相互依赖，完全可以让他们同时执行来缩短整个程序运行的时间

**/
//异步操作同时执行,两种写法
let [foo,bar] = await Promise.all(fun1,fun2);


let fooPromise = fun1();
let barPromise = fun2();
let foo = await fooPromise;
let bar = await barPromise;

//实现一个自动执行器
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    var gen = genF();
    step(function() { return gen.next(undefined); });
    function step(nextF) {
      try {
        var next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    
  });
}

//异步处理方法的实现：Promise、Generator、async三者的实例


//异步遍历器asyncIterator   for await of遍历异步
//异步Generator函数相当于async和Generator函数的合体




















