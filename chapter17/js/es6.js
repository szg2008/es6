/**
Promise对象:
	1.异步编程的一种解决方案。
		(1)代表一个异步操作，有三种状态，Pending、Resolved、Rejected。只有是异步操作才可以决定当前是哪一种状态;
		(2)一旦状态改变，就不会再变，任何时候都可以得到这个结果。
	2.是一个构造函数，用来生成Promise实例。
**/
function promise1(ms){
	return new Promise((resolve,reject) => {
		setTimeout(resolve,ms,'done');
	});
}

promise1(2000).then((value) => {
	console.log(value);//done
});

let promise2 = new Promise(function(resolve,reject){
	console.log('resolve');//初始化之后立即执行
	resolve('ok');//表示执行成功,如果带有参数，这个参数会传递给回调函数
});
promise2.then(function(rs){
	console.log(rs);//所有同步操作执行完成之后再执行,只有执行了resolve方法之后才证明是回调成功了
});
console.log('reject');//resolve	reject	then

/**
Promise.prototype.then():使用then方法可以采用链式写法，因为then方法本身也是返回一个Promise对象
**/

/**
Promise.prototype.catch():
	用于指定发生错误时的回调函数
		最好不要都写在then中，分开成功和失败对应then和catch,这样的话，如果then方法抛出错误，catch也会捕获;
		catch返回的还是一个Promise对象，因此还可以继续链式的写then方法，如果此时这个then方法里面报错了，而下面又没有catch，那么这个错误将不会被捕获
		catch里面还能报错，如果没有继续的catch工作，那么这个错误就不能捕获了
**/
/**promise3('1.json').then(function(){

}).catch(function(){

});**///如果状态返回resolve，则执行then方法，反之，执行的是catch方法

// bad
//promise4
  //.then(function(data) {
    // success
  //}, function(err) {
    // error
  //});

// good
//promise5
  //.then(function(data) { //cb
    // success
  //})
  //.catch(function(err) {
    // error
  //});

/**
Promise.all(params):params一定是具有Iterator接口的参数
	将多个Promise实例包装成一个实例
	实例的状态有2中，params中的状态都为resolve;状态其中有一个为reject
**/

/**
Promise.race(params):params一定是具有Iterator接口的参数
	将多个Promise实例包装成一个实例
	和all方法类似，不同的是params其中有一个改变状态，实例就改变状态
**/

/**
Promise.resolve():将现有的对象转化为Promise对象
	参数情况：
		(1).一个Promise实例：不做任何修改，返回这个实例;
		(2).一个thenable对象：具有then方法的对象
		(3).是一个不具有then方法的对象或者根本不是一个对象，将其转化成Promise对象，并且状态为Resolve
		(4).不带任何参数，然后直接返回一个状态是Resolve的Promise对象
**/
//thenable
let thenable = {
  then: function(resolve, reject) {
    resolve('hello then');
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value);  // hello then
});

let hello3 = Promise.resolve('Hello3');
hello3.then(function(rs){
	console.log(rs);//Hello3
});

let hello4 = Promise.resolve();
hello4.then(function(){
	console.log('hello4');//hello4
});

setTimeout(function () {
  console.log('three');//下一轮事件循环结束时执行
}, 0);

Promise.resolve().then(function () {
  console.log('two');//本轮事件循环结束时执行
});

console.log('one');//最先执行

// one
// two
// three

/**
Promise.reject():返回一个新的Promise对象实例，该实例的状态为reject
**/
var hello5 = Promise.reject('error');
hello5.then(null,function(rs){
	console.log(rs);//error
});

/**
附加方法done和finally的实现
**/
Promise.prototype.done = function(onResolved,onRejected){
	this.then(onResolved,onRejected)
		.catch(function(reason){
			setTimeout(()=>{throw reason},0);
		});
}

Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};

/**
Promise.try:模拟try...catch模块，用来捕获同步或者异步的异常情况
**/

console.log('*****************practice*****************************');
//理解Promise.all,只有传入的promise数组每个都返回resolve，才会返回成功
//在我们平时的需求中，或许有这种情况的需求，比如我们需要发2个ajax请求时，不管他们的先后顺序，当这2个ajax请求都同时成功后，我们需要执行某些操作的情况下，这种情况非常适合
var promise1 = new Promise(function(resolve){
    setTimeout(function(){
        resolve(1);
    },3000);
});
var promise2 = new Promise(function(resolve){
    setTimeout(function(){
        resolve(2);
    },1000);
});
Promise.all([promise1,promise2]).then(function(value){
    console.log(value); // 打印[1,2]
});
//理解Promise.race
//只要有一个promise对象进入FulFilled或者Rejected状态的话，程序就会停止，且会继续后面的处理逻辑
var runPromise = new Promise(function(resolve){
    setTimeout(function(){
        console.log(1);
        resolve(2);
    },500);
});
var runPromise2 = new Promise(function(resolve){
    setTimeout(function(){
        console.log(3);
        resolve(4);
    },1000);
});
// 第一个promise变为resolve后程序停止
Promise.race([runPromise,runPromise2]).then(function(value){
    console.log(value);//1 2 3	运行完runPromise之后race停止运行，因此runPromise2中的resolve不能继续执行
});