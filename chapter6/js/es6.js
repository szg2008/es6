/**
 * 第6章 数值的扩展
 */

/*二进制和八进制的表示法，分别使用0b和0o表示*/
console.log(0b1110111);//119
console.log(0o775);//509
//转换为十进制数需要使用Number方法
console.log(Number(0b11011));//27
console.log(Number(0o774));//508


/**
 * Number:
 *      isFinite:检查一个数值是否为非无穷,只对数值有效，对于非数值('34'),一律返回false
 *      isNaN:检查一个数值是否为NaN
 *      parseInt:相当于全局中的parseInt
 *      parseFloat:相当于全局中的parseFloat
 *      isInteger:判断一个数是否为整数
 *      EPSILON:一个极小的常量，为了减小浮点数计算产生的误差,如果运算产生的误差小于这个常量，就认为是返回了正确的结果
 *      安全整数MAX_SAFE_INTEGER和MIN_SAFE_INTEGER,分别表示整数表示范围的两个临界点
 *      isSafeInteger:检查数值是否超越了表示范围
 * **/
//isFinite
console.log(Number.isFinite('24'));//false
console.log(Number.isFinite(34));//true
console.log(Number.isFinite(Infinity));//false
//isNaN
console.log(Number.isNaN('34'));//false
console.log(Number.isNaN(NaN));//true
console.log(Number.isNaN(34));//false
//parseInt parseFloat
console.log(Number.parseInt('12.33'));//12
console.log(Number.parseFloat(23.455));//23.455
//isInteger
console.log(Number.isInteger(23));//true
console.log(Number.isInteger('34'));//false
console.log(Number.isInteger(23.31));//false
//EPSILON
console.log(Number.EPSILON);
//MAX_SAFE_INTEGER、MIN_SAFE_INTEGER
console.log(Number.MAX_SAFE_INTEGER);//9007199254740991
console.log(Number.MIN_SAFE_INTEGER);//-9007199254740991
//isSafeInteger
console.log(Number.isSafeInteger(90071992547409911));//false
/**
 * Math:
 *      trunc:去除一个数值的小数部分，返回整数部分，对于非数值，先调用Number方法返回数值。否则返回NaN
 *      sign:返回一个数值是正数、负数还是0.+1，-1，0，-0，NaN
 *      cbrt:返回一个数的立方根
 *      clz32:返回一个数的32位无符号整数形式有多少个前导0,对于小数，方法只考虑正数部分
 *      imul:返回两个数以32位带符号整数形式相乘的结果
 *      fround:返回一个数的单精度浮点数形式
 *      hypot:返回所有参数的平方和的平方根
 * ***/
//trunc
console.log(Math.trunc(12.30));//12
console.log(Math.trunc('23.43'));//23
console.log(Math.trunc('ccc'));//NaN
//sign
console.log(Math.sign(12));//1
console.log(Math.sign(-12));-1
console.log(Math.sign(0));//0
console.log(Math.sign(-0));//-0
console.log(Math.sign('23'));//1
console.log(Math.sign('foo'));//NaN
//cbrt
console.log(Math.cbrt('27'));//3
console.log(Math.cbrt(22).toFixed(2));//2.80
console.log(Math.cbrt('c++'));//NaN
//clz32
console.log(Math.clz32(1));//31
console.log(Math.clz32(45));//26
//imul
console.log(Math.imul(-2,4));//-8
//fround
console.log(Math.fround(1.336));//1.3359999656677246
console.log(Math.fround(5.3));//5.300000190734863
//hypot
console.log(Math.hypot(3,4));//5
console.log(Math.hypot(3,'foo'));//NaN

/**
 * 对数方法：
 *      expm1:返回e^x-1
 *      log1p:返回\ln(1+x)
 *      log10:返回以10为底的x的对数
 *      log2"返回以2为底的x的对数
 **/
console.log(Math.expm1(2));//6.38905609893065
console.log(Math.log1p(3));//1.3862943611198906
console.log(Math.log10(10));//1
console.log(Math.log2(8));//3
/**
 * 三角函数方法:
 *      sinh:返回x的双曲正弦
 *      cosh:返回x的双曲余弦
 *      tanh:返回x的双曲正切
 *      asinh:返回x的反双曲正弦
 *      acosh:返回x的反双曲余弦
 *      atanh:返回x的反双曲正切
 * ***/

//指数运算符**
console.log(2**2);//4
console.log(3**6);//729