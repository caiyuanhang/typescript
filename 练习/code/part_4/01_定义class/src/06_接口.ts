type myType = {
    name: string,
    age: number
};

type myType = {
    gender: string
}

const obj1: myType = {
    name: 'type',
    age: 123
};


// 接口
interface myInterface {
    name: string;
    age: number;
};

interface myInterface {
    gender: string;
    sayHello(): void;
};

const obj2: myInterface = {
    name: 'interface',
    age: 456,
    gender: 'man',
    sayHello: () => { }
};

// 在class中实现接口
class IterfaceClass implements myInterface {
    name: string;
    age: number;
    gender: string;
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
