export { };


// 1、object类型声明。
// 1）使用object关键字
let g: object;
g = {};
g = function () { };   // 当给g赋值一个function时，不报错。

// 2）使用{}
// 2.1）指定固定的属性，在属性类型的冒号前面添加 ? 表示这个属性可有可无。
let h: { name: string, age: number, status?: boolean };
h = { name: "字", age: 1 };     // status因为?的存在，这个属性无也不报错。
h = { name: "字符", age: 12, status: true };

// 2.2）对象不同类型属性之间还可以使用 & 连接起来（&的用法）：
let h1: { name: string } & { age: number };
h1 = { name: "str", age:123 } 
// h1 = { name: "str" }; h1 = { age:123 }    // 如果h1只存在name或age中的任意一个对象，都会报错。

// 2.3）只指定某些属性的类型，其他属性的类型可以是任意值。
let i: { name: string, [propName: string]: any };
i = { name: "string", age: 11, state: "OK", man: "man" };

// 2.3）限定函数的结构（如：形参、返回值的类型），可以使用类似箭头函数的方式。
let j: (param1: number, param2: number) => number;
j = function (param1, param2) { return param1 + param2 };
j(1, 2);
// j(1,"2");   // 报错，第二个实参不能为字符串。


// 2、array类型声明
// 1）语法1：
let k: string[];
k = ["str1", "str2"];
// k = ["str1", 111];   // 报错，这个数组里面只能装字符串类型的值

// 2）语法2：
let l: Array<number>;
l = [11, 22];
// l = [33, "四四"];   // 同以上K的第二个赋值。


// 3、tuple元组类型，就是指固定长度的数组。
let m: [string, string];
m = ["str1", "str2"];
// m = ["str1"];    // 报错，赋值数组长度少于规定数组的长度。
// m = ["str1", "str2", "str3"];    // 报错，赋值数组长度多于规定数组的长度。


// 4、enum枚举类型。（TS新增类型），要先使用enum关键字声明一个枚举类。
enum Gender {
    Male,
    Female
};
let n:{ name: string, gender: Gender };
n = { name: "laowang", gender: Gender.Male };
console.log(n.gender === Gender.Male);


// 5、类型别名
type myType = string;   // 这个myType就类似于string。
let o: myType;
o = "str";
// o = 123;    // 报错，o的类型必须是string

type myType1 = 1 | 2 | 3 | 4 | 5;
let p: myType1;
p = 1;
p = 0;  // 报错，6超出了定义的类型   
let q: myType1;
q = 5;
q = 6;  // 报错，同上