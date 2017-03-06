/**
modules加载的实现：
	1.传统方法：
	2.浏览器加载es6模块，同样使用script标签，type＝module；都是异步加载，相当于打开了script脚本的defer属性
	3.es6模块和CommonJS模块的差异：
		C输出的是一个值的拷贝（缓存值），es6输出的是值的引用（不缓存）
		C是运行时加载，es6是编译时输出接口	
**/