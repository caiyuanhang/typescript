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


四、ts基本类型（本节所有的代码在part_1）
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
        // 在括号外进行类型声明，就是给函数返回值添加类型声明，如果返回值不是number类型，则报错提示。
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
    // let d:any;      // 显式any类型声明。
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
    // 2.2.1）语法一：在unknown变量后面添加 as ，as 后面跟着被赋值变量的类型
    f = e as string;
    // 2.2.2）语法二：在unknown变量前面添加 <被赋值变量的类型>
    f = <string>e
```
```js
    // 3）void类型，用来表示空，在函数中，就是表示函数没有返回值。注意：函数的返回值使用了void之后，return后面不能有任何值（有则报错），但return、return null、return undefined除外。
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
    // 5.2.1）指定属性的类型。在属性类型的冒号前面添加 ? 表示该属性是可选的（即有跟没有，都可以）。
    let h:{ name: string, age: number, status?: boolean };
    h = {name:"字", age:1};     // status因为?的存在，这个属性无也不报错。
    h = {name:"字符",age:12, status:true};

    // 5.2.2）对象不同类型属性之间还可以使用 & 连接起来（&的用法）：
    let h1: { name: string } & { age: number };
    h1 = { name: "str", age:123 }    // 变量h1这个对象要同时存在name和age属性。

    // 5.2.3）只指定某些属性的类型，其他属性的类型可以是任意值。
    // 注意：这里的propName只是一个变量名（可以是任意名字），propName后面跟着类型声明表示指定该属性名的类型，any表示该属性的值可以是任意类型的值。
    let i:{ name: string, [propName: string]: any };
    i = { name: "string", age: 11, state: "OK", man: "man" };   // 除了name属性指定为string类型之外，其他属性的类型都可以不用声明（不管添加多少属性）。

    // 5.3）可以使用类似箭头函数的形式，限定函数的结构（如：形参、返回值的类型）。
    let j: (param: number, param: numer) => number;
    j = function(param1, param2){ return param1 + param2 };
    j(1,2);
    // j(1,"2");   // 报错，第二个实参不能为字符串。


    // 6）array类型声明，其实是声明数组里面装的值是什么类型，也就是什么类型的数组，有两种语法格式。
    // 6.1）语法一：类型[]
    let k: string[];
    k = ["str1", "str2"];
    k = ["str1", 111];   // 报错，这个数组里面只能装string类型的值

    // 6.2）语法二：Array<类型>
    let l: Array<number>;
    l = [11, 22];
    l = [33, "四四"];   // 报错，这个数组里面只能装number类型的值。


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
    n = { name: "laowang", gender: "xiaowang" };   // 不能将类型string分配给类型Gender
    console.log(n.gender === Gender.Male);   // true
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


五、TS的编译选项。（本节所有的代码在part_2）
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
            "outDir": "./dist",

            // 5）"outFile"，使用了这个属性后，所有在全局作用域中的代码会被合并到同一个文件中。注意：当被编译的ts文件中出现了模块化的代码，需要将"module"的值设置为"system"或"and"才能将不同模块的代码合并到同一个文件中。不能跟outDir一起混用，混用了会把outDir覆盖掉。
            "outFile": "./dist/index.js",

            // 6）"allowJs"，表示是否对js文件进行编译，默认值为false。
            "allowJs": false,

            // 7）"checkJs"，检查js代码是否符合ts语法规范，默认值是false。
            "checkJs": false,

            // 8）"removeComments"，ts文件编译后是否移除注释，默认值是false。
            "removeComments": false,

            // 9）"noEmit"，不编译ts文件（即不生成js文件），默认值是false。
            "noEmit": false,

            // 10）"noEmitOnError"，当ts文件有错误时不编译（即有错误时不生成js文件），默认值是fasle。注意：只要有一个ts文件有语法错误，所有的ts文件都不会被编译。
            "noEmitOnError": false,

            // 11）"strict"，作为所有严格检查的总开关，当它为true的时候，所有严格检查的属性都为true，反之亦然，默认值为false。
            "strict": false,

            // 12）"alwaysStrict"，用来设置ts文件编译后是否使用严格模式，默认值是false。（注意：如果ts文件中使用了import、export等模块语法，则编译后的ts文件没有"use strict"关键字，因为使用了import、export等模块语法之后，js代码默认进入严格模式。备注：这种情况只出现在webstorm；在vs code未曾有这种情况，详情看dist文件夹）
            "alwaysStrict": false,

            // 13）"noImplicitAny"，不允许未声明类型的变量默认为any类型，默认值为false。
            "noImplicitAny": false,

            // 14）"noImplicitThis"，不允许函数中存在不明确类型的this，默认值为false。
            "noImplicitThis": false,

            // 15）"strictNullChecks"，严格检查null值，默认值为false。
            "strictNullChecks": false
        }
    }
```


六、使用webpack打包ts代码（本节所有的代码在part_3）。
1、初始化package.json文件。
```js
    npm init webpack-build-ts
```

2、下载打包需要的依赖
```js
    npm install -D webpack webpack-cli ts-loader typescript html-webpack-plugin clean-webpack-plugin @babel/core @babel/preset-env babel-loader core-js

    // 备注：@babel/core是babel的核心工具，@babel/preset-env让代码兼容不同的浏览器环境，babel-loader主要作为babel和webpack结合的工作，core-js可以让老版本的浏览器能用到新的js语法。
```

3、配置webpack.config.js文件
```js
    // 引入node的path包，主要作用是用来拼接路径。
    const path = require('path');

    // 生成html模板
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    // 每次重新build之前都会先清空之前的dist文件夹（因为每次更新project再次build之后，新build出来的文件其实是覆盖了旧的文件，这时有可能存在某些旧文件依然遗留在project中的情况，这个插件可以很好解决这个问题）
    const { CleanWebpackPlugin } = require('clean-webpack-plugin');

    module.exports = {
        // 1）指定入口文件。
        entry: "./src/index.ts",

        // 2）指定打包文件的所在目录
        output: {
            // 指定打包文件的目录
            path: path.resolve(__dirname, 'dist'),

            // 打包后文件的名称
            filename: "home.js",

            // 设置webpack的打包环境配置
            environment: {
                // 禁止webpack打包的时候使用箭头函数
                arrowFunction: false
            }
        },

        // 3）指定webpack打包时要使用的模块
        module: {
            // 指定要加载的规则
            rules: [
                {
                    // test指定规则生效的文件
                    test: /\.tsx?$/,

                    // 要使用的loader，loader的加载顺序是从后往前的。
                    // 简单用法（适合配置选项少）
                    use: 'ts-loader',
                    // 复杂用法（适合配置选项多）
                    use: [
                        // 配置babel
                        {
                            // 指定加载器
                            loader: "babel-loader",

                            // 设置babel的配置
                            options: {
                                // 设置预定义环境
                                presets: [[
                                    "@babel/preset-env",
                                    
                                    //环境配置信息 
                                    {
                                        // 要兼容的目标浏览器（注意：里面的浏览器要双引号），只有这里设置了对应浏览器的兼容版本之后，使用该浏览器打开project才不会报错未定义。
                                        targets: {
                                            "chrome": "58",
                                            "ie": "11"
                                        },

                                        // 指定corejs的版本
                                        "corejs": "3",

                                        // corejs的使用方式"usage"，表示按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]]
                            }
                        },
                        'ts-loader'
                    ]

                    // 指定要排除的文件
                    exclude: /node_modules/
                }
            ]
        },

        // 4）注意：指定完上面的内容之后，还需要添加mode属性，来选择是"development"模式还是"production"模式，否则在build构建的时候会出现警告。mode为"production"模式，build出来的文件内容是正常的。
        mode: "production",

        // 5）配置webpack插件
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: "./public/index.html",
                filename: "home.html"
            })
        ],

        // 6）设置省略扩展名。注意：在设置.tsx省略扩展名之后，要在tsconfig.js文件的compilerOptions下面添加"jsx": "react"属性。
        resolve: {
            extensions: ['.ts','.tsx','js','jsx']
        }
    }
```

4、配置tsconfig.json文件
```js
    {
        "compilerOptions": {
            "target": "ES2015",
            "module": "ES2015",
            "strict": true,
        }
    }
```

5、编辑package.json文件。
```js
    {
        "scripts": {
            // npm run build，构建打包文件
            "build": "webpack"

            // npm run start，运行项目
            "start": "webpack serve --open chrome.exe"
        }
    }
```
注意：因为浏览器不支持ts文件，当在浏览器中直接打开ts文件的时候，会显示成下载，但是打开tsx文件则不会显示下载，而是直接打开页面。


七、面向对象
1、面向对象：即所有的操作都是通过对象来进行（在程序中）。那么对象又是什么呢？这就要先说说程序是什么了，计算机程序的本质就是对现实事务的抽象，抽象的反义词是具体，比如：照片是对一个具体的人的抽象，汽车模型是对具体的汽车的抽象等等。而程序也是对具体事务的抽象，在程序中我们可以表示一个人、一条狗、一把枪、一颗子弹等等所有的事物，一个事务到了程序中就变成了一个对象。（如下例：可以慢慢思考）
```js
    1）操作浏览器要使用window对象；

    2）操作网页要使用document对象；

    3）操作控制台要使用console对象。
```
在程序中，所有的对象都被分成了数据和功能两个部分，以人为例，人的性命、性别、年龄、身高、体重等属于人的数据，说话、走路、吃饭、睡觉这些属于人的功能。在对象中，数据被称为静态属性，功能被称为动态方法。总之，在程序中一切皆对象。

2、类（class）：
要想面向对象，操作对象，首先便要拥有对象，那么如何创建对象呢？创建对象，必须要先定义类，所谓的类可以理解为对象的模型，程序中可以根据类创建指定类型的对象，比如：可以通过Person类来创建人的对象，通过Dog类创建狗的对象，通过Car类来创建汽车的对象，不同的类可以用来创建不同的对象。

1）定义类class：
```js
    // 使用class关键字定义一个类（创建对象），类包含两个部分：属性和对象。
    class Person {
        // 1.1）属性。属性分为两种，一种是实例属性，一种是类属性（静态属性）
        // 1.1.1）实例属性，直接在class内定义的属性。需要调用new Person后得到实例对象，然后通过访问实例对象可以看到实例属性。
        name =  "实例属性";

        // 1.1.2）类属性（静态属性），在class内定义的属性，但需要在属性前添加static关键字。不用调用new Person，直接Person.静态属性名，即可以看到类属性
        static nameClass = "类属性（静态属性）";

        // 1.2）只读属性。设置属性为只读状态，当属性为只读状态，但又被赋值时，依然可以编译成js文件，也可以正常打印，但是会在控制台显示警告：无法分配到 "name" ，因为它是只读属性。
        readonly name = "只读的实例属性";
        static readonly nameClass = "只读的类属性"; 


        // 1.2）方法
        // 1.2.1）实例方法，跟实例属性一样，只能通过实例去调用这个方法。
        sayHello(){
            console.log('实例方法：世界真好！');
        };

        // 1.2.2）类方法，跟类属性一样，只能通过类去调用这个方法。
        static sayHelloClass(){
            console.log('类方法：世界真大！');
        };
    }

    // 实例person
    let person = new Person();
    console.log('查看实例属性：', person, person.name);    // 查看实例属性： Person {name: "实例属性"} 实例属性

    person.name = "改变实例属性";   // 无法分配到 "name" ，因为它是只读属性。但还是会被编译和执行
    console.log('实例属性被改变：', person.name);   // 实例属性被改变： 改变实例属性
    
    person.sayHello();    // 实例方法：世界真好！


    // class Person
    console.log('查看class属性：', Person, Person.nameClass);   // 查看class属性： class Person { ... }

    Person.nameClass = "静态属性被改变";    // 无法分配到 "nameClass" ，因为它是只读属性。但还是会被编译和执行
    console.log('静态属性被改变：', Person.nameClass);  // 静态属性被改变： 静态属性被改变

    Person.sayHelloClass();    // 类方法：世界真大！
```

2）构造函数constructor：
```js
    class Dog {
        // 定义实例属性的类型
        name: string;
        age: number;

        // constructor构造函数，constructor构造函数会在new Dog()时调用（实例化对象的时候调用），在调用时，可以把相应的参数传递过来。
        constructor(name: string, age: number){
            // 在constructor和实例方法中，this就是表示当前实例化的对象。通过this可以向实例对象添加属性。
            this.name = name;
            this.age = age;
        };

        // 实例方法，在方法中可以通过this来表示当前方法调用的对象。
        bark(){
            console.log('实例对象：', this);
        };
    }

    let dog = new Dog('小黑', 3);
    dog.bark();
```

3）继承extends：
```js
    // 当多个类具有相同的结构、属性和方法时，则可以将多个类中相同的部分提取出来作为父类（也叫做：超类），然后通过extends关键字让子类继承父类所有的属性和方法，这样可以让代码降低冗余。


    // 原始：多个类具有相同的结构、属性和方法：
    class Dog {
        name: string;
        age: number;

        constructor(name: string, age: number){
            this.name = name;
            this.age = age;
        };

        seyHello(){
            console.log('汪汪汪！');
        }
    }

    class Cat {
        name: string;
        age: number;

        constructor(name: string, age: number){
            this.name = name;
            this.age = age;
        };

        seyHello(){
            console.log('喵喵喵！');
        }
    }


    // extends继承：可以将Dog和Cat中相同的部分提取出来作为父类，然后通过extends关键字继承父类的所有内容。
    class Animal {
        name: string;
        age: number;

        constructor(name: string, age: number){
            this.name = name;
            this.age = age;
        };

        seyHello(){
            console.log('动物在叫！');
        }
    };

    class Dog extends Animal {
        // 如果子类需要添加一些父类没有的方法、属性，直接添加即可，添加的属性、方法如果跟父类的重复，则子类的属性、方法会在子类中（注意：是子类）将从父类继承的重复部分覆盖掉。
        seyHello(){
            console.log('汪汪汪！');
        }
    };
    let dog = new Dog("狗", 3);
    console.log('Dog：', dog, dog.seyHello());

    class Cat extends Animal {
        seyHello(){
            console.log('喵喵喵！');
        }
    };
    let cat = new Cat("猫", 2);
    console.log('Cat：', cat cat.seyHello());
```

4）super关键字
```js
    // 在类中，super方法表示当前类的父类（要说具体，就是相当于父类中的constructor），调用super()就等于调用父级的constructor()，也等于new 父类名()。
    class Animal {
        name: string;

        constructor(name: string) {
            this.name = name;
        };

        sayHello() {
            console.log('动物在叫~');
        };
    };

    class Dog extends Animal {
        age: number;

        constructor(name: string, age: number) {
        // 注意：如果在子类中写了构造函数，在子类的构造函数中必须对父类构造函数进行调用。
            super(name);
            this.age = age;
        };

        sayHello() {
            super.sayHello();
        };
    };
    let dog = new Dog("旺财", 3);
    dog.sayHello();
    console.log('Dog子类：', dog);
```

5）抽象类
```js
    // 以abstract开头的类是抽象类。抽象类和其他类的区别不大，只是不能用来创建对象，简单的说抽象类就是专门用来被继承的类，当你不希望类被实例化的时候，就可以使用abstract。
    abstract class Animal {
        name: string;

        constructor(name: string) {
            this.name = name;
        };

        // 抽象类中可以添加抽象方法，在方法前面添加abstract即可定义抽象方法，抽象方法没有方法体（返回值为：void）。注意：抽象方法只能定义在抽象类中，子类必须对抽象方法进行重写。
        abstract sayHello(): void;
    };
    let animal = new Animal();    // 当Animal被定义为抽象类的时候，实例化会报错：无法创建抽象类的实例。

    class Dog extends Animal {
        // 对抽象类的抽象方法进行重写。
        sayHello() {
            console.log('汪汪汪！');
        };
    };
    let dog = new Dog('旺财');
    dog.sayHello();
    console.log('Dog子类：', dog);

    class Cat extends Animal {
        sayHello() {
            console.log('喵喵喵');
        };
    };
    let cat = new Cat('大喵');
    cat.sayHello();
    console.log('Cat子类：', cat);
```

6）interface接口（只在ts编写中才有）
```js
    // 1）ts中描述对象或类中属性的类型，可以使用type关键字。
    type myType = {
        name: string,
        age: number
    };
    const obj1: myType = {
        name: 'type',
        age: 123
    };


    // 2）此外，还可以用接口定义一个对象或类的结构，用来限制一个类或对象中应该包含哪些属性和方法，同时接口也可以当成类型声明去使用。
    interface myInterface {
        name: string;
        age: number;

        // 注意：接口中所有的属性都不能有实际的值（即只定义结构，不考虑实际值），接口中所有的方法都是抽象方法。（interface跟abstract class不一样的点是，interface只能有抽象方法，而abstract class可以有抽象方法，也可以有普通方法；interface用的是implements，class用的是extends）
        sayHello(): void;
    };
    const obj2: myInterface = {
        name: 'interface',
        age: 456,
        sayHello: () => { }
    };

    // 在class中实现接口
    class IterfaceClass implements myInterface {
        name: string;
        age: number;

        sayHello() { 
            alert('myInterface');
        };

        constructor(name: string, age: number, gender: string) {
            this.name = name;
            this.age = age;
            this.gender = gender;
        }
    };
    const iterfaceClass = new IterfaceClass('laoli', 50, 'man');
    console.log('iterfaceClass：', iterfaceClass);


    // 3）注意：interface和type的区别是：
    // 1）相同的type不能重复声明使用，比如上面定义了myType，如果这里再定义一个，并增加一个额外的属性类型声明，会报错：标识符“myType”重复。
    type myType = {
        gender: string
    };

    // 2）而interface跟type相反，可以重复声明使用，并且新添加的对象属性类型声明会跟之前的对象属性类型声明合并。
    interface myInterface {
        gender: string;
    };
    // 合并为：
    interface myInterface {
        name: string;
        age: number;
        gender: string;
    };
```

7）属性的封装
```js
```

8）泛型
```js
    // 在定义函数或类时，如果遇到类型不明确的参数、返回值、书、属性、方法等，就可以使用泛型，所谓的泛型就是不确定的类型。

```