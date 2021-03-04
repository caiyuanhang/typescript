export {};


// 1、字面量类型声明。
let a: 10;
a = 10;
// a = 20;     // 报错，不能将类型"20"分配给类型"10"

let b: "male" | "female";
b = "male";
b = "female";
// b = 123;    // 报错，不能将类型"123"分配给类型""male"|"female""

let c: boolean | string;
c = false;
c = "laowang";
// c = 123     // 报错，不能将类型"123"分配给类型"string|boolean"


// 2、any类型声明
let d:any;      // 显示any类型声明
// let d;      // 隐式any类型声明
d = 10;
d = "hello";
d = true;


// 3、unknown类型声明
let e: unknown;
e = 100;
e = "hello-world"
e = false;
// unknown实际上就相当于一个类型安全的any，因为any类型的变量可以赋值给任意的变量，而unknown不能随意赋值给其他变量。
let f: string;
f = d;  // 当把any类型的d赋值给string类型的f的时候，不会报错
// f = e;  // 报错，不能将类型"unknown"分配给类型"string"，此时，如果要解决报错有两种方法。
// 2.1）给e添加判断，只有e的类型为string的时候才执行 f = e 的赋值过程。
if(typeof e === "string"){
    f = e;
}
// 2.2）类型断言，用来告诉TS解析器unknown类型变量的实际类型。
f = e as string;
f = <string>e


// 4、void类型声明
function fn(): void{};
function fn1(): void{ return };
function fn2(): void{ return null };
function fn3(): void{ return undefined };
// function fn4(): void{ return 11 };   // 报错，不能将类型"11"分配给类型"void"


// 5、never类型声明
function fnn(): never {
    throw new Error("报错了！");
};
// function fnn1(): never { let a =1; };   // 报错。