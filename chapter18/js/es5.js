'use strict';

/**
aysync函数：
	1.在Generator函数的基础上，＊改成async，yield改成await，仅此而已
	2.针对Genarator的改进，体现在几个方面：
		(1)内置执行器：函数async的执行和普通函数一样，只需要调用一下即可使用，不必使用next方法
		(2)语义更加清晰：async表示该函数里面有异步操作，await表示需要等待才能进行下一步结果
		(3)适用性更广：await后面可以跟Promise对象或者原始的数据类型
		(4)async返回Promise对象，可以直接使用then方法进行后续的操作
**/
function timeout(ms) {
	return new Promise(function (resolve) {
		setTimeout(resolve, ms);
	});
}

async function asyncPrint(value, ms) {
	await timeout(ms);
	console.log(value);
}

asyncPrint('hello async func', 2000);
