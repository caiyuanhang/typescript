(function () {
    abstract class Animal {
        name: string;

        constructor(name: string) {
            this.name = name;
        };

        abstract sayHello(): void;
    };

    let animal = new Animal();

    class Dog extends Animal {
        constructor(name: string){
            super(name)
        }
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
})()