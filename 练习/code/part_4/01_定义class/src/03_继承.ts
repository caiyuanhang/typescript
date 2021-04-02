(function () {
    // 原始
    /* class Dog {
        name: string;
        age: number;

        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        };

        seyHello() {
            console.log('汪汪汪！');
        }
    };
    let dog = new Dog("狗", 3);
    console.log('Dog：', dog);
    dog.seyHello();

    class Cat {
        name: string;
        age: number;

        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        };

        seyHello() {
            console.log('喵喵喵！');
        }
    };
    let cat = new Cat("猫", 2);
    console.log('Cat：', cat);
    cat.seyHello() */

    // 使用继承后
    class Animal {
        name: string;
        age: number;

        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        };

        seyHello() {
            console.log('动物在叫！');
        }
    };

    class Dog extends Animal {
        // seyHello() {
        //     console.log('汪汪汪！');
        // }
    };
    let dog = new Dog("狗", 3);
    console.log('Dog：', dog);
    dog.seyHello();

    class Cat extends Animal {
        // seyHello(){
        //     console.log('喵喵喵！');
        // }
    };
    let cat = new Cat("猫", 2);
    console.log('Cat：', cat);
    cat.seyHello()
})()