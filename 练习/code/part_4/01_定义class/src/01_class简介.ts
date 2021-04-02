class Person {
    readonly name = "实例属性";

    static readonly nameClass = "类属性（静态属性）";

    sayHello(){
        console.log('实例方法：世界真好！');
    };

    static sayHelloClass(){
        console.log('类方法：世界真大！');
    };
};

let person = new Person();
console.log('查看实例属性：', person, person.name);

person.name = "改变实例属性";
console.log('实例属性被改变：', person.name);

person.sayHello();


console.log('查看class属性：', Person, Person.nameClass)

Person.nameClass = "静态属性被改变";
console.log('静态属性被改变：', Person.nameClass);

Person.sayHelloClass();