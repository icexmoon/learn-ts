// 函数类型表达式

function greeter(fn: (a: string) => void) {
    fn("Hello, World");
}

function printToConsole(s: string) {
    console.log(s);
}

greeter(printToConsole);

type GreetFunction = (a: string) => void;
function greeter2(fn: GreetFunction) {
    fn("Hello, World");
}
greeter2(printToConsole);

// 调用签名

type RandomIDGenerator = {
    prefix: string;
    (): string;
}

function printId(idGenerator: RandomIDGenerator) {
    console.log(idGenerator.prefix + idGenerator());
}
function generateID(): string {
    return Math.random().toString(16).slice(2);
}

generateID.prefix = "id-";
printId(generateID)

// 构造签名

type PersonConstructor = {
    new(firstName: string, lastName: string): Person;
}

class Person {
    firstName: string;
    lastName: string;
    fullName(): string {
        return this.firstName + " " + this.lastName;
    }
    constructor(theFirst: string, theLast: string) {
        this.firstName = theFirst;
        this.lastName = theLast;
    }
}

function makePerson(ctor: PersonConstructor, firstName: string, lastName: string): Person {
    return new ctor(firstName, lastName);
}

let p = makePerson(Person, "Bob", "Smith");
console.log(p.fullName());

type DateType = {
    (n?: number): string;
    new(s: string): Date;
}

function printDate(date: DateType) {
    console.log(date());
    console.log(new date("2015-12-25"));
}

printDate(Date);

// 泛型函数

function firstElement(array: any[]) {
    return array[0];
}

const e1 = firstElement([1, 2, 3]);
const e2 = firstElement(["a", "b", "c"]);
console.log(e1, e2);
// 这里推断出的类型都是 any

function firstElement2<Type>(array: Type[]) {
    return array[0];
}

const e3 = firstElement2([1, 2, 3]);
const e4 = firstElement2(["a", "b", "c"]);
console.log(e3, e4);
// e3 推断出的类型是 number|undefined
// e4 推断出的类型是 string|undefined
const e5 = firstElement2([]);
console.log(e5);

function map<Input, Output>(array: Input[], func: (arg: Input) => Output): Output[] {
    return array.map(func);
}

const parsed = map(["1", "2", "3"], (n) => parseInt(n));
console.log(parsed);

// 约束

function longest<Type extends { length: number }>(a: Type, b: Type) {
    if (a.length >= b.length) {
        return a;
    } else {
        return b;
    }
}

const l = longest("abcd", "efg");
console.log(l);
// 这里推断出的类型是 "abcd"|"efg"
const l2 = longest([1, 2, 3], [4, 5]);
console.log(l2);
// 这里推断出的类型是 number[]
// const l3 = longest(new Date(), new Date());
// 报错，Date 对象没有 length 属性

// 处理受约束的值
// function minimumLength<Type extends {length: number}>(
//     obj: Type,
//     minLength: number
// ): Type {
//     if (obj.length >= minLength) {
//         return obj;
//     } else {
//         return { length: minLength };
//         // 报错，不能将 { length: minLength } 赋给 Type
//     }
// }

// 指定类型参数

function combine<Type>(arr1: Type[], arr2: Type[]) {
    return arr1.concat(arr2);
}

const arr = combine([1, 2, 3], [4, 5]);
console.log(arr);
// const arr2 = combine([1,2,3], ["d","e"]);
// 报错，不能将类型 "string" 赋给类型 "number"
const arr3 = combine<string | number>([1, 2, 3], ["d", "e"]);
console.log(arr3);

function firstElement3<Type>(arr: Type[]) {
    return arr[0];
}

const a = firstElement3([1, 2, 3]);
console.log(a);
// 推断出的类型是 number | undefined

function firstElement4<Type extends any[]>(arr: Type) {
    return arr[0];
}

const a2 = firstElement4([1, 2, 3]);
console.log(a2);
// 推断出的类型是 any

// 使用更少的泛型参数

function filter<Type>(array: Type[], func: (arg: Type) => boolean): Type[] {
    return array.filter(func);
}

const a3 = filter([1, 2, 3], (n) => n < 2);
console.log(a3);

function filter2<Type, Func extends (arg: Type) => boolean>(
    array: Type[],
    func: Func
): Type[] {
    return array.filter(func);
}

function greet<Str extends string>(s: Str) {
    console.log("Hello, " + s);
}

greet("world");

function greet2(s: string) {
    console.log("Hello, " + s);
}

greet2("world");

// 可选参数

function printNumber(num?: number) {
    console.log(num);
}

printNumber(); // 输出 undefined
printNumber(42);  // 输出 42

function printNumber2(num: number = 11) {
    console.log(num);
}
printNumber2(15) // 输出 15
printNumber2() // 输出 11
printNumber2(undefined) // 输出 11

function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i);
    }
}
myForEach([1, 2, 3], (a) => console.log(a));
myForEach([1, 2, 3], (a, i) => console.log(a, i));
// 1
// 2
// 3
// 1 0
// 2 1
// 3 2

function myForEach2(arr: any[], callback: (arg: any, index?: number) => void) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i]);
    }
}

myForEach2([1, 2, 3], (a) => console.log(a));
myForEach2([1, 2, 3], (a, i) => console.log(a, i));
// 1
// 2
// 3
// 1 undefined
// 2 undefined
// 3 undefined

// 函数重载
function add(a: number, b: number): number;
function add(arr: number[]): number;
function add(aOrArr: number | number[], b?: number) {
    if (typeof aOrArr === "number" && typeof b === "number") {
        return aOrArr + b;
    } else if (Array.isArray(aOrArr)) {
        return aOrArr.reduce((sum, item) => sum + item, 0);
    }
    throw new Error("Parameters type error");

}

console.log(add(1, 2));
console.log(add([1, 2, 3]));

// 编写良好的重载

function len(str: string): number;
function len(arr: any[]): number;
function len(strOrArr: any): number {
    if (typeof strOrArr === 'string') {
        return strOrArr.length;
    }
    else if (Array.isArray(strOrArr) && strOrArr) {
        return strOrArr.length;
    }
    else {
        throw new Error("Invalid input: expected string or array");
    }
}

console.log(len("hello"));
console.log(len([1, 2, 3]));

function len2(strOrArr: string | any[]): number {
    if (typeof strOrArr === 'string') {
        return strOrArr.length;
    }
    else if (Array.isArray(strOrArr)) {
        return strOrArr.length;
    }
    else {
        throw new Error("Invalid input: expected string or array");
    }
}
console.log(len2("hello"));
console.log(len2([1, 2, 3]));

// 函数中的 this

class User {
    id: number;
    admin: boolean;
    constructor(id: number, admin: boolean = false) {
        this.id = id;
        this.admin = admin
    }
    becomeAdmin(): void {
        this.admin = true;
    }
}

class UserManager {
    users: User[];
    constructor(users: User[]) {
        this.users = users;
    }
    filterUsers(func: (user: User) => boolean): User[] {
        let resultUsers: User[] = [];
        if (this.users && this.users.length > 0) {
            for (let i = 0; i < this.users.length; i++) {
                let currentUser = this.users[i];
                if (currentUser !== undefined) {
                    if (func(currentUser)) {
                        resultUsers.push(currentUser)
                    }
                }
            }
        }
        return resultUsers;
    }
}

let users = [new User(1, true), new User(2, false), new User(3, true)];
let userManager = new UserManager(users);
let userAdmins = userManager.filterUsers(function (user: User): boolean {
    return user.admin === true;
})
console.log(userAdmins);
let userAdmins2 = userManager.filterUsers((user: User): boolean => {
    return user.admin === true;
})
console.log(userAdmins2)

// void

function void1(): void {
    // do something
}

function void2(): void {
    // do something
    return;
}

function void3(): void {
    // do something
    return undefined;
}

// unknow

// function func1(a: unknown){
//     a.length; // 报错，“a”的类型为“未知”
// }

function func2(a: any) {
    a.length; // 不会报错
}

function safeParse(a: string): unknown {
    return JSON.parse(a);
}
// const obj1 = safeParse("{a:123}")

// never

function neverReturn(): never {
    throw new Error();
}

function neverExample(a: string | number) {
    if (typeof a === 'string') {
        console.log(a) // 推断类型为 string
    }
    else if (typeof a === 'number') {
        console.log(a) // 推断类型为 number
    }
    else {
        const typeDealCheck: never = a;
        console.log(a) // 推断类型为 never
    }
}

// function neverExample2(a:string|number|any[]){
//     if(typeof a === 'string'){
//         console.log(a) // 推断类型为 string
//     }
//     else if (typeof a === 'number'){
//         console.log(a) // 推断类型为 number
//     }
//     else{
//         const typeDealCheck: never = a; // 报错，不能将类型“any[]”分配给类型“never”
//         console.log(a) // 推断类型为 never
//     }
// }

function multiply(n: number, ...m: number[]): number[] {
    return m.map((x) => x * n);
}

const numbers = multiply(10, 2, 3, 4, 5);
console.log(numbers);

const numbers2 = multiply(10, ...[2, 3, 4, 5]);
console.log(numbers2);

type ABC = { a: number, b: number, c: number };
function sum({ a, b, c }: ABC): number {
    return a + b + c;
}
console.log(sum({ a: 1, b: 2, c: 3 }));

type VoidFunc = () => void;

const voidFunc1: VoidFunc = ()=>{
    return true;
}
const voidFunc2: VoidFunc = ()=>true;
const voidFunc3: VoidFunc = function (){
    return true;
}

const arr5 = [1,2,3];
arr5.forEach(voidFunc1);

// function VoidFunc5():void{
//     return true; // 报错，不能将类型“boolean”分配给类型“void”
// }


