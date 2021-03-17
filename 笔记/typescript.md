一、typescript是什么？
typescript（以下简称ts）：是一门以js为基础构建的语言，是js的超集，所有js代码都可以在ts文件中编写；ts扩展了js，并添加了类型；ts可以在任何支持js的平台中执行。
【注意】ts不能被js解析器直接执行，需要编译成js后才可被js解析器执行。


二、ts增加了什么？
1、类型（支持给变量定义类型）；
2、支持ES的新特性，并添加了ES不具备的新特性；
3、强大的开发工具（让编辑器具有提示功能，以前的js编写是没有提示的）；
4、丰富的配置选项（代码的编写可以配置严格一点，也可以配置松散一些）。


三、ts开发环境搭配
1、下载和安装node.js；
2、使用npm包管理工具安装typescript；
```javascript
    npm install -g typescript
```
3、创建一个ts文件；
4、使用tsc对ts文件进行编译：在ts文件所在目录打开命令行，执行命令：tsc xxx.ts。 


四、ts基本类型
1、类型声明：它是ts非常重要的一个特点，通过类型声明可以指定ts中变量（包括实参、形参等）的类型。指定类型后，当变量赋值时，ts编译器会自动检查值是否符合类型声明，符合则赋值，否则报错。总之，变量类型声明后，该变量只能存储声明的类型。
```javascript
    // 语法（注意：类型字母是小写）：
    let 变量：类型；
    let 变量：类型 = 值；
    function fn(参数：类型，参数：类型)：类型{
        ...代码块
    }

    // 1）给变量声明类型，再针对类型赋值。
    let a: number; 
    a = 123;
    let b: string;
    b = "hello";

    // 2）如果变量声明和赋值同时进行，TS可以自动对变量进行类型检测，也就是说可以不用手动进行类型声明。自动类型判断：ts拥有自动的类型判断机制，当变量声明和赋值同时进行时，ts编译器会自动根据值的类型判断变量的类型，然后进行相应的类型声明，所以当你的变量声明和赋值同时进行，可以省略掉类型声明。
    let bool = true;
    bool = false;

    // 3）函数的参数和返回值也可以声明类型。
    function sum(num1: number,num2: number): number{
        // 在括号外进行类型声明，意思是给函数返回值添加类型声明，如果返回值不是number类型，则报错提示。
        return num1 + num2;
    }
    sum(11,22);
```

2、使用字面量进行类型声明，字面量类型声明后面，会把变量的值或类型锁定，也就是类似js中const的用法，但比const的使用更加灵活。（这种方式一般用的比较少）
```js
    // 1）给变量规定单个值。
    let a: 10;
    a = 10;

    // 2）给变量规定多个值，不同值之间使用 | 隔开。
    let b: "male" | "female";
    b = "male";
    b = "female";

    // 3）给变量规定多个类型。
    let c: boolean | string;
    c = false;
    c = "hello"
```

3、ts自有类型声明
```js
    // 1）any类型，表示是任意类型得值，一个变量设置为any类型后相当于对该变量关闭了TS的类型检测（使用TS时，一般不建议使用any类型）
    // let d:any;      // 显示any类型声明。
    let d;      // 隐式any类型声明
    d = 10;   
    d = "hello";
    d = true;


    // 2）unknown类型，表示未知类型的值。（在变量的值不确定的情况下，尽量多用unknown，少用any）
    let e: unknown;
    e = 100;
    e = "hello-world"
    e = false;

    // unknown实际上就相当于一个类型安全的any，因为any类型的变量可以赋值给任意的变量，而unknown不能随意赋值给其他变量。
    let f: string;
    f = d;  // 当把any类型的d赋值给string类型的f的时候，不会报错
    f = e;  // 报错，不能将类型"unknown"分配给类型"string"。此时，如果要解决报错有两种方法。
    // 2.1）给e添加判断，只有e的类型为string的时候才执行 f = e 的赋值过程。
    if(typeof e === "string"){
        f = e;
    }

    // 2.2）类型断言，用来告诉TS解析器unknown类型变量的实际类型。
    // 2.2.1）语法一：在unknown变量后面添加 as 被赋值变量的类型
    f = e as string;
    // 2.2.2）语法二：在unknown变量前面添加 <被赋值变量的类型>
    f = <string>e
```
```js
    // 3）void类型，用来表示空，在函数中，就是表示函数没有返回值。注意：函数的返回值使用了void之后，return不能有任何值（有则报错），但可以是return、return null、return undefined。
    function fn(): void{};
    function fn1(): void{ return };
    function fn2(): void{ return null };
    function fn3(): void{ return undefined };
    function fn4(): void{ return 1 };    // 报错，不能将类型"1"分配给类型"void"


    // 4）never类型声明，表示永远不会返回结果。若在函数的返回值中使用了never类型声明，则必须在函数体中有终结下面代码执行的代码，如下示例：
    function fnn(): never {
        // 使用了throw抛出错误后，throw下面的代码不会被执行。
        throw new Error("报错了！");
    };
    function fnn1(): never { let a = 1; };     // 报错。因为函数体中没有终结往下执行的代码


    // 5）object类型声明。
    // 5.1）在变量后面使用object关键字声明类型，这种用法比较少。在js中，万物皆对象，当这个变量被赋值function的时候是没有报错的，而且用ts声明一个对象类型是更倾向于限制对象里面的属性，而不是限制一个变量到底是不是对象。
    let g: object;
    g = {};
    g = function(){};   // 当给g赋值一个function时，不报错。

    // 5.2）在变量后面使用{}声明类型，这种用法有利于限制对象里面的属性，可以用来指定对象中有哪些属性。
    // 5.2.1）指定属性的类型。在属性类型的冒号前面添加 ? 表示该属性是可选的。
    let h:{ name: string, age: number, status?: boolean };
    h = {name:"字", age:1};     // status因为?的存在，这个属性无也不报错。
    h = {name:"字符",age:12, status:true};

    // 5.2.2）对象不同类型属性之间还可以使用 & 连接起来（&的用法）：
    let h1: { name: string } & { age: number };
    h1 = { name: "str", age:123 }    // h1对象要同时存在name和age属性。

    // 5.2.3）只指定某些属性的类型，其他属性的类型可以是任意值。
    let i:{ name: string, [propName: string]: any };
    i = { name: "string", age: 11, state: "OK", man: "man" };   // 除了name属性指定为string之外，其他的属性类型都可以不用声明，而且不管添加多少属性。

    // 5.3）限定函数的结构（如：形参、返回值的类型），可以使用类似箭头函数的方式。
    let j: (param: number, param: numer) => number;
    j = function(param1, param2){ return param1 + param2 };
    j(1,2);
    // j(1,"2");   // 报错，第二个实参不能为字符串。


    // 6）array类型声明，其实是声明数组里面装的值是什么类型，也就是什么类型的数组，有两种语法格式。
    // 6.1）语法一：类型[]
    let k: stringp[];
    k = ["str1", "str2"];
    k = ["str1", 111];   // 报错，这个数组里面只能装字符串类型的值

    // 6.2）语法二：Array<类型>
    let l: Array<number>;
    l = [11, 22];
    l = [33, "四四"];   // 同以上K的第二个赋值。


    // 7）tuple元组类型，就是指固定长度的数组。（TS新增类型）
    let m: [string, string];
    m = ["str1", "str2"];
    m = ["str1"];    // 报错，赋值数组长度少于规定数组的长度。
    m = ["str1", "str2", "str3"];    // 报错，赋值数组长度多于规定数组的长度。


    // 8）enum枚举类型。（TS新增类型），要先使用enum关键字声明一个枚举类，类名首字母需要大写。
    enum Gender {
        Male,
        Female
    };
    let n:{ name: string, gender: Gender };
    n = { name: "laowang", gender: Gender.Male };
    console.log(n.gender === Gender.Male);
```

4、类型别名
```js
    // 使用type关键字声明一个类型别名。
    type myType = string;   // 这个myType就类似于string。
    let o: myType;
    o = "str";
    o = 123;    // 报错，o的类型必须是string


    // 应用场景：当多个变量要用到某些规定的多个值类型时，可以使用类型别名来简化代码的书写。
    type myType1 = 1 | 2 | 3 | 4 | 5;
    let p: myType1;
    p = 1;
    p = 0;  // 报错，6超出了定义的类型   
    
    let q: myType2;
    q = 5;
    q = 6;  // 报错，同上
```


五、TS的编译选项。
1、自动编译单个文件。编译文件时，在路径后面添加 -w 可以让TS编译器自动监视文件的变化（即：当文件内容发生变化时，会对文件重新进行编译）。
```js
    tsc xxx.ts -w
```

2、自动编译整个项目。可以直接使用 tsc 指令，来对当前Project下的所有ts文件进行编译，注意：这里有个前提，需要在Project根目录下创建一个ts的配置文件tsconfig.json（注：此JSON文件可以写注释），即使tsconfig.json文件里面只有一个{}，也能完成Project下面所有ts文件的编译。
```js
    // 当在tsc后面加上-w之后，就表示让ts编译器监视当前Project下面的所有ts文件，当有ts文件发生改动时，则进行重新编译。
    tsc -w
```

3、tsconfig.json文件的相关配置，ts编译器可以根据配置文件里面的信息来进行编译：
```js
    扩展：在tsconfig.json文件中，路径里面的 ** 表示任意目录，* 表示任意文件。
    {
        // 1、"include"，用来指定哪些ts文件需要被编译，它的值是一个Array，里面用来装需要编译的目录或文件。
        "include": ["./02_auto_more/zero.ts", "./02_auto_more/two/**/*"],

        // 2、"exclude"，配置不需要编译的ts文件，值也是一个Array。默认值为：["node_module", "bower_components", "jspm_packages"]。
        "exclude": ["./02_auto_more/two/e.ts"],

        // 3、"extends"，定义被继承的配置文件。在下例中，表示当前配置文件会继承base.json文件中所有的配置信息。
        "extends": "./config/base.json",

        // 4、"files"，指定被编译文件的列表（只有需要编译的文件很少时才会用到）。
        "files": ["core.ts", "sys.ts", "types.ts", "parser.ts"],

        // 5、"compilerOptions"，ts编译器的编译选项（最重要、也最复杂）：
        "compilerOptions": {
            // 1）"target"，指定ts编译成的es的版本，它的值只能是"es3"、"es5"、"es6"、"es2015"、"es2016"、"es2017"、"es2018"、"es2019"、"es2020"、"exnext"。
            "target": "es6",

            // 2）"module"，指定要使用的模块规范，它的值有这些"none"、"commonjs"、"amd"、"umd"、"system"、"es6"、"es2015"、"es2020"、"exnext"。
            "module": "es6",

            // 3）"lib"，用来指定项目中使用的库，默认是"dom"，一般情况下都不用去改的。它的值有很多，可以随意设个错误的值来查看所有的值列表。
            "lib": "dom",

            // 4）"outDir"，用来指定ts文件编译后所在的目录。
            "outDir": "./dist"

            // 5）"outFile"，使用了这个属性后，所有在全局作用域中的代码会被合并到同一个文件中。注意：当被编译的ts文件中出现了模块化的代码，需要将"module"的值设置为"system"或"and"才能将不同模块的代码合并到同一个文件中。
            "outFile": "./dist/index.js"
        }
    }
```