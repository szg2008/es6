/**
Module加载：
	1.传统方法：
		一般情况下，是在浏览器中嵌入script标签来引入外部文件，但是这个默认情况下是同步加载的，如果要进行异步加载，在标签里面添加defer或者async，两者的区别在于：defer要等到整个页面渲染完成才执行脚本，async是一旦这个脚本下载完成就会执行，中断渲染，执行完成之后继续渲染。
	2.浏览器加载es6模块，同样使用script标签，type＝module；都是异步加载，相当于打开了script脚本的defer属性
	3.es6模块和CommonJS模块的差异：
		CommonJS输出的是一个值的拷贝（缓存值），es6输出的是值的引用（不缓存）
		CommonJS是运行时加载，es6是编译时输出接口
	4.ES6模块的转码：
		(1)使用babel进行转码
		(2)ES6 module transpiler:npm install -g es6-module-transpiler	compile-modules convert -o out.js file1.js,其中，-o可以指定输出的文件名
		(3)SystemJS:<script src="system.js"></script>system.import(),返回的是一个Promise对象.
**/