"use strict";
exports.__esModule = true;
// 1、案例1：
// 声明一个变量a，同时指定它的变量类型为number。
var a;
// 因为a的变量类型设置为了number，所以在后面的赋值过程中，a只能赋值数值，不能赋值其他类型的值，会报错。
a = 123;
// a = "str";   // 当给a赋值一个字符串时，报错。
// 2、案例2：
var b;
b = "hello";
// b = 123;    // 当变量b类型为string时，赋值number内容，会报错。
// 3、如果变量声明和赋值同时进行，TS可以自动对变量进行类型检测，也就是说可以不用手动进行类型声明。
var bool = true;
bool = false;
// bool = 123;     // 当变量b类型为Boolean时，赋值number内容，会报错。
// 4、ts类型声明，除了能用在普通变量上，也可以用在函数的参数和返回值上。
function sum(num1, num2) {
    return num1 + num2;
    // 在括号外进行类型声明，意思是给函数返回值添加类型声明，如果返回值不是number类型，则报错提示。
    // return num1 + num2 + "";
}
sum(11, 22);
// sum(11,"22")    // 形参规定了是number类型，如果传入其他类型的值，会报错提示。
