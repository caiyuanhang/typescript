let zero = "初始";
zero = "一";
zero = "二";
zero = "三";


// 测试noImplicitAny属性
function tenty(a, b) {
    return a + b;
}
// 解决办法：指定形参的具体类型
function tenty01(a: number, b: number) {
    return a + b
}


// 测试noImplicitThis属性
function twenty() {
    console.log(this);
}
// 解决办法：指定this的具体类型
function twenty01(this: Window) {
    console.log(this);
}


// 测试strictNullChecks属性，id="box"的元素可能不存在。
let box = document.getElementById("box");
box.addEventListener("click", function () { });
// 解决方法，使用？短语法，当box01有的时候才执行后面的内容。
let box01 = document.querySelector("box1");
box01?.addEventListener("click", function () { })