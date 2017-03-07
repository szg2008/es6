'use strict';

(function () {
    "use strict";
    /***
     * let和const声明的变量不是全局变量
     * let a = 1;
     * window.a //undefined
     */
    /**
     * let
     * 1.只在作用域内有效
     * 2.和var一样存在变量提升
     * 3.暂时性死区
     * 4.在同一个作用域内不允许重复声明变量
     * 5.块级作用域
     * ***/
    //1.只在作用域内有效

    console.log('只在作用域内有效');
    function fun1() {
        var a = 'a';
        var b = 'b';
        console.log(a); //a
    }
    fun1();
    //console.log(a);//ReferenceError
    for (var i = 0; i < 10; i++) {
        console.log(i); //0 1 2 ...
    }
    //console.log(i);//ReferenceError

    for (var j = 0; j < 10; j++) {}
    console.log(j); //10
    //存在变量提升,如果没有使用let定义，而是先赋值了，这时候输出会显示undefined
    console.log('存在变量提升');
    console.log(c); //undefined
    var c = 'c';
    //暂时性死区,在块级作用域外面声明了一个变量，在作用域内直接使用变量会输出undefined,直到let声明变量并且赋值之前
    console.log('暂时性死区');
    var d = 'd';
    if (true) {
        console.log(_d); //undefined
        _d = 'dd';
        var _d = void 0;
        //d = 'dd';
        console.log(_d); //undefined
    }
    console.log(d); //d
    //不允许重复声明变量
    console.log('不允许重复声明变量');
    function fun2() {
        var a = void 0;
        var b;
        console.log(a);
    }
    fun2();
    //块级作用域
    console.log('块级作用域');
    function fun3() {
        var m = 10;
        if (true) {
            var _m = 5;
        }
        console.log(m); //10
    }

    fun3();

    var f = void 0;
    var ff = void 0;
    {
        (function () {
            var aa = 'aa';
            ff = 'ff';
            f = function fun4() {
                console.log(aa);
            };
        })();
    }

    f(); //aa
    console.log(ff); //ff

    /**
     * const
     * 1.声明常量。一旦声明，值将不能改变
     * 2.变量不提升，存在暂时性死区
     * 3.只在块级作用域内有效
     * 4.不可以重复声明变量
     *
     * ***/
    //声明常量
    console.log('const');
    console.log('声明常量');
    var PI = 3.1415;
    //PI = 3;//RenfenceError
    console.log(PI);
    var mm = 'mm'; //必须初始化赋值
    //变量不提升，存在暂时性死区
    if (true) {
        console.log(MAX); //undefined
        var MAX = 10;
        console.log(MAX); //10
    }
    //console.log(MAX);报错
    //不可以重复声明变量
    var arr = [];
    arr.length = 0;
    arr.push(1);
    console.log(arr);
    var obj = {};
    obj.age = 13;
    console.log(obj);
})();

//practice
console.log('*********************practice**************************');
console.log(pracA); //undefined
var pracA = 'pracA';
function pracFun1() {
    console.log(pracB); //undefined
    var pracB = 'pracB';
    var pracC = 'pracC1';
}
pracFun1();
var pracC = 'pracC';
var pracD = [];
console.log(pracD); //[]
pracD.push(33);
console.log(pracD); //[33]
