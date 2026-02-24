function returnParameter<T>(param: T): T {
    return param;
}

returnParameter<string>('hello');
returnParameter('world');

let returnParamFunc: <T>(param: T) => T = returnParameter;

let returnParamFunc2: { <T>(param: T): T } = returnParameter;

interface ReturnParameterFunc {
    <T>(param: T): T;
}
let returnParamFunc3: ReturnParameterFunc = returnParameter;

// 泛型类

class GenericNumber<T> {
    zeroValue?: T;
    add?: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };
console.log(myGenericNumber.add(1, 2));

function loggingIdentity2<T>(arg: T): T {
    // console.log(arg.length); // 报错，类型“T”上不存在属性“length”。
    return arg;
}

interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

console.log(loggingIdentity<string>('string'));
// console.log(loggingIdentity<number>(1)); // 报错，类型“number”不满足约束“Lengthwise”
// console.log(loggingIdentity<boolean>(true)); // 报错，类型“boolean”不满足约束“Lengthwise”
console.log(loggingIdentity<{ length: number }>({ length: 10 }));

// 类型参数约束

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
    return obj[key];
}
const obj = { 'a': 1, 'b': 2, 'c': 3 }
console.log(getProperty(obj, 'a'));
// console.log(getProperty(obj, 'd')); // 报错，类型“"d"”的参数不能赋给类型“"a" | "b" | "c"”的参数

class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Student extends Person {
    id: number;
    constructor(name: string, id: number) {
        super(name);
        this.id = id;
    }
}

class Teacher extends Person {
    courseName: string;
    constructor(name: string, courseName: string) {
        super(name);
        this.courseName = courseName;
    }
}

function createPerson<T extends Person>(constractor: { new(...args: any[]): T }, ...args: any[]): T {
    return new constractor(...args);
}

const p = createPerson(Person, '张三');
const s = createPerson(Student, '张三', 1);
const t = createPerson(Teacher, '张三', 'Javascript');

// keyof

type Perosn2 = { name: string; age: number; job: string };
type PersonKeys = keyof Perosn2;
const key: PersonKeys = 'name';
const key2: PersonKeys = 'age';
const key3: PersonKeys = 'job';
// const key4: PersonKeys = 'sex'; // 报错

type numberAttrObj = {[key: number]: any};
type keys = keyof numberAttrObj; // 类型推断为 number
const key5: keys = 1;
const key6: keys = 2;


type Mapish = { [k: string]: boolean };
type M = keyof Mapish; // 类型推断为 string | number
const key7: M = 1;

// typeof

function printParam(param: any){
    if(typeof param === 'string'){
        console.log(param.toUpperCase());
    }
    else if(typeof param === 'number'){
        console.log(param.toFixed(2));
    }
    else{
        console.log(param);
    }
}

printParam('hello');
printParam(123.456);
printParam({});

let s1 = "hello";
let s2: typeof s1 = "world";

type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>; // 类型推断为 boolean

function isOk(x: unknown){
    return x === 'ok';
}
// type K2 = ReturnType<isOk>; // 报错
type K3 = ReturnType<typeof isOk>;

type Person2 = { name: string; age: number };
type Name = Person2['name']; // 类型推断为 string
type Age = Person2['age']; // 类型推断为 number
type NameOrAge = Person2['name' | 'age']; // 类型推断为 string | number
type NameOrAge2 = Person2[keyof Person2];

const myArray = [{name:'xiaoming',age:18},{name:'zhangsan',age:16}]
type MyArrayElement = typeof myArray[number]; // 类型推断为 {name: string; age: number;}
type ElementName = MyArrayElement['name']; // 类型推断为 string
type ElementAge = MyArrayElement['age']; // 类型推断为 number
