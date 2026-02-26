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

type numberAttrObj = { [key: number]: any };
type keys = keyof numberAttrObj; // 类型推断为 number
const key5: keys = 1;
const key6: keys = 2;


type Mapish = { [k: string]: boolean };
type M = keyof Mapish; // 类型推断为 string | number
const key7: M = 1;

// typeof

function printParam(param: any) {
    if (typeof param === 'string') {
        console.log(param.toUpperCase());
    }
    else if (typeof param === 'number') {
        console.log(param.toFixed(2));
    }
    else {
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

function isOk(x: unknown) {
    return x === 'ok';
}
// type K2 = ReturnType<isOk>; // 报错
type K3 = ReturnType<typeof isOk>;

type Person2 = { name: string; age: number };
type Name = Person2['name']; // 类型推断为 string
type Age = Person2['age']; // 类型推断为 number
type NameOrAge = Person2['name' | 'age']; // 类型推断为 string | number
type NameOrAge2 = Person2[keyof Person2];

const myArray = [{ name: 'xiaoming', age: 18 }, { name: 'zhangsan', age: 16 }]
type MyArrayElement = typeof myArray[number]; // 类型推断为 {name: string; age: number;}
type ElementName = MyArrayElement['name']; // 类型推断为 string
type ElementAge = MyArrayElement['age']; // 类型推断为 number

interface Animal {
    eat(food: any): void;
}

interface Dog extends Animal {
    bark(): void;
}

interface Car {
    drive(): void;
}

type DogIsAnimal = Dog extends Animal ? true : false; // 类型推断为 true
type CarIsAnimal = Car extends Animal ? true : false; // 类型推断为 false

interface IdLabel {
    id: number;
}

interface NameLabel {
    name: string;
}

function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
    if (typeof nameOrId === 'string') {
        return { name: nameOrId };
    }
    return { id: nameOrId };
}

const a = createLabel('xiaoming');

type IdOrNameLabel<T extends string | number> = T extends string ? NameLabel : IdLabel;
function createLabel2<T extends string | number>(nameOrId: T): IdOrNameLabel<T> {
    if (typeof nameOrId === 'string') {
        return { name: nameOrId } as IdOrNameLabel<T>;
    }
    return { id: nameOrId } as IdOrNameLabel<T>;
}

const b = createLabel2('xiaoming');
const c = createLabel2(1);
console.log(b, c);

// type MessageOf<T> = T['message']; // 报错，类型“T”上不存在属性“message”。

type MessageOf2<T extends { message: unknown }> = T['message'];

interface Email {
    message: string;
}

type EmailMessageContents = MessageOf2<Email>; // 类型推断为 string

type MessageOf3<T> = T extends { message: unknown } ? T['message'] : never;
type EmailMessageContents2 = MessageOf3<Email>; // 类型推断为 string
type DogMessageContents = MessageOf3<Dog>; // 类型推断为 never

type MessageOf4<T> = T extends { message: infer Message } ? Message : never;
type EmailMessageContents3 = MessageOf4<Email>; // 类型推断为 string
type DogMessageContents2 = MessageOf4<Dog>; // 类型推断为 never

type ArrayElement<T> = T extends Array<infer U> ? U : never;
const arr = [1, 2, 3];
type ArrayElementType = ArrayElement<typeof arr>; // 类型推断为 number

type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
function f1(): string {
    return 'hello';
}

function f2(arg: number): number {
    return arg;
}

function f3() { }

type F1ReturnType = GetReturnType<typeof f1>; // 类型推断为 string
type F2ReturnType = GetReturnType<typeof f2>; // 类型推断为 number
type F3ReturnType = GetReturnType<typeof f3>; // 类型推断为 void
type F4ReturnType = GetReturnType<string>; // 类型推断为 never

function f4(id: number): number;
function f4(name: string): string;
function f4(arg: number | string): number | string;
function f4(arg: number | string): number | string {
    return arg;
}

type F4ReturnType2 = GetReturnType<typeof f4>; // 类型推断为 number | string

type ToArray<T> = T extends any ? T[] : never;
type ToArrayType = ToArray<string | number>; // 类型推断为 string[] | number[]

type ToArray2<T> = [T] extends [any] ? T[] : never;
type ToArrayType2 = ToArray2<string | number>; // 类型推断为 (string|number)[]

type Booleans = {
    [attr: string]: boolean;
}

const CheckList: Booleans = {
    check1: true,
    check2: false,
    check3: true,
}

type Booleans2<T> = {
    [attr in keyof T]: boolean;
}

type Fish = {
    name: string;
    swim: () => void;
}

type CheckList2 = Booleans2<Fish>; // 类型推断为 { name: boolean; swim: boolean; }

type ReadonlyPerson = {
    readonly name: string;
    readonly age: number;
}

type Writable<T> = {
    -readonly [key in keyof T]: T[key];
}

type WritablePerson = Writable<ReadonlyPerson>;
const tom: WritablePerson = { name: 'Tom', age: 20 };
tom.age = 21;

type OptionalPerson = {
    name: string;
    age?: number;
    career?: string;
}

type Full<T> = {
    [key in keyof T]-?: T[key];
}

type FullPerson = Full<OptionalPerson>; // 类型推断为 { name: string; age: number; career: string; }

type Getter<T> = {
    [key in keyof T as `get${Capitalize<string & key>}`]: () => T[key];
}

type Car2 = {
    brand: string;
    model: string;
}

type CarGetter = Getter<Car2>; // 类型推断为 { getBrand(): string; getModel(): string; }

type NoId<T> = {
    [key in keyof T as key extends 'id' ? never : key]: T[key];
}

type Person3 = {
    id: number;
    name: string;
    age: number;
}

type PersonWithoutId = NoId<Person3>; // 类型推断为 { name: string; age: number; }

type HandleEvents<Events extends { kind: string }> = {
    [Event in Events as Event['kind']]: (event: Event) => void;
}

type SquareEvent = {
    kind: 'square';
    size: number;
}

type RectangleEvent = {
    kind: 'rectangle';
    width: number;
    height: number;
}

type EventHandlers = HandleEvents<SquareEvent | RectangleEvent>;
// 类型推断为 {
//     square: (event: SquareEvent) => void;
//     rectangle: (event: RectangleEvent) => void;
// }

type Hello = 'Hello';
type HelloWorld = `${Hello} World`; // 类型推断为 "Hello World"

type Hello2 = 'Hello';
type Bye2 = 'Bye';
type Jack = 'Jack';
type Tom = 'Tom';
type Message = `${Hello2 | Bye2} ${Jack | Tom}`;
// 类型推断为 "Hello Jack" | "Hello Tom" | "Bye Jack" | "Bye Tom"

type WatchableObject<T> = {
    on<Key extends keyof T & string>(eventName: `${Key}Changed`, callback: (newVal: T[Key]) => void): void;
}
function makeWatchedObject<T extends object>(obj: T): T & WatchableObject<T> {
    const newObj = { ...obj };
    (newObj as WatchableObject<T>).on = (eventName: string, callback: (newVal: any) => void) => {
        console.log(`Event: ${eventName}`);
    };
    return newObj as T & WatchableObject<T>;
}
const person = { name: 'Tom', age: 10 };
const watchedPerson = makeWatchedObject(person);
watchedPerson.on('ageChanged', (newVal) => { // newVal 推断为 number
    console.log(`I'm now ${newVal} years old`);
});
watchedPerson.on('nameChanged', (newVal) => { // newVal 推断为 string
    console.log(`I'm now called ${newVal}`);
});
// watchedPerson.on('schoolChanged', ()=>{  // 报错
// });
// watchedPerson.on('nameUpdated', ()=>{  // 报错
// });

type HelloWorld2 = 'Hello World';
type UppercaseHelloWorld = Uppercase<HelloWorld2>; //类型推断为 "HELLO WORLD"

type LowercaseHelloWorld = Lowercase<HelloWorld2>; // 类型推断为 "hello world"

type HelloWorld3 = 'hello world';
type CapitalizeHelloWorld = Capitalize<HelloWorld3>; // 类型推断为 "Hello world"

type HelloWorld4 = 'Hello world';
type UncapitalizeHelloWorld = Uncapitalize<HelloWorld4>; // 类型推断为 "hello world"
