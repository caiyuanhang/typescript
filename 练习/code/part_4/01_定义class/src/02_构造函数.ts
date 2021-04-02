class Dog {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    };

    bark() {
        console.log('实例对象：', this, this.name, this.age);
    };
}

let dog = new Dog('小黑', 3);
dog.bark();