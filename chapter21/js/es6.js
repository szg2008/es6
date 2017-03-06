/**Module:
	import：输入其他模块提供的功能
	export：规定模块的对外接口
**/
export var name = 'suzg';//输出变量
export function funname(){console.log('name');}//输出方法
function f(){}
export {f}
//使用as，给输入输出的变量进行重命名
export default //为模块指定默认输出,也可以指定非匿名函数
//其他模块加载这个默认模块的时候，import命令可以给该匿名函数指定任意名字
export default class{}//指定输出默认的类
//跨模块的常量，使用const定义的常量，只能在本模块中访问，如果需要多个模块共享，需要使用export
//db.js
export const db = {
  url: 'http://my.couchdbserver.local:5984',
  admin_username: 'admin',
  admin_password: 'admin password'
};

//index.js
export {db} from './db.js'

//使用db变量的时候，直接引入index.js就ok

//import不能在运行时加在模块，理论上来说，做不到按需加载，条件加载


