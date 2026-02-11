// src/index.ts - TS 示例代码
// 定义一个接口（TS 核心特性）
interface Person {
  name: string;
  age: number;
  country: string;
}

// 定义一个函数
function greet(person: Person): string {
  return `你好，我是${person.name}，今年${person.age}岁！, 我是${person.country}人。`;
}

// 调用函数
const user: Person = {
  name: "张三",
  age: 25,
  country: "中国",
};

// 输出结果
console.log(greet(user));

// 联合
type ID = number | string;
function getID(id: ID): string {
  return `ID: ${id}`;
}

console.log(getID(123));
console.log(getID("abc"));

type MyBoolean = true | false;
function isTrue(value: MyBoolean): string {
  return value ? "真" : "假";
}

console.log(isTrue(true));
console.log(isTrue(false));

type WindowStates = "open" | "closed" | "minimized";
function getWindowState(state: WindowStates): string {
  return `当前窗口状态为：${state}`;
}

console.log(getWindowState("open"));
console.log(getWindowState("closed"));
console.log(getWindowState("minimized"));

function wrapInArray(obj: string | string[]) {
  if (typeof obj === "string") {
    return [obj];
  }
  return obj;
}

console.log(wrapInArray("hello"));
console.log(wrapInArray(["hello"]));

// 泛型

type StrArray = Array<string>;
function printStrArray(arr: StrArray) {
  arr.forEach((item) => {
    console.log(item);
  });
}

printStrArray(["hello", "world"]);

type NumberArray = Array<number>;
function getTotal(arr: NumberArray) {
  return arr.reduce((acc, cur) => acc + cur);
}

console.log(getTotal([1, 2, 3, 4, 5]));

interface Result<T> {
  data: T;
  errorMsg: string | undefined;
  success: boolean;
  toString: () => string;
  isSuccess: () => boolean;
  setData: (data: T) => void;
  getData: () => T | null;
}

class MyResult<T> implements Result<T> {
  data: T;
  errorMsg: string | undefined;
  success: boolean;
  constructor(data: T, success: boolean, errorMsg?: string) {
    this.data = data;
    this.success = success;
    this.errorMsg = errorMsg;
  }
  toString() {
    return `data: ${this.data}, success: ${this.success}, errorMsg: ${this.errorMsg}`;
  }

  // 实现 isSuccess 方法
  isSuccess(): boolean {
    return this.success;
  }

  // 实现 setData 方法
  setData(data: T): void {
    this.data = data;
  }

  // 实现 getData 方法
  getData(): T | null {
    return this.success ? this.data : null;
  }
}

const result: Result<number> = new MyResult<number>(123, true);
console.log(result.toString());

// 结构化类型系统

interface Point {
  x: number;
  y: number;
}

function printPoint(point: Point) {
  console.log(`x: ${point.x}, y: ${point.y}`);
}

printPoint({ x: 1, y: 2 });
// printPoint({x: 1});
// printPoint({x: 1, y: 2, z: 3});
const point3 = { x: 12, y: 26, z: 89 };
printPoint(point3); // 打印 "12, 26"

class MyPoint {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const point = new MyPoint(1, 2);
printPoint(point);

interface Empty { }

function printEmpty(empty: Empty) {
  console.log("empty");
}

printEmpty({ x: 1, y: 2 });

class Car {
  drive() {
    // hit the gas
  }
}
class Golfer {
  drive() {
    // hit the ball far
  }
}
// No error?
let w: Car = new Golfer();

let name: string = "张三";
console.log(name.toUpperCase());

let age: number = 42;
console.log(age.toFixed(2));

let isOk: boolean = true;
console.log(isOk.valueOf());

let list: number[] = [1, 2, 3];
console.log(list.length);

let list2: Array<number> = [1, 2, 3];
console.log(list2.length);

let obj: any = { x: 0 };

console.log(obj.x);
console.log(obj.y); //undefined
// console.log(obj.toUpperCase()); // TypeError: obj.toUpperCase is not a function

function printMsg(msg: string) {
  console.log(msg);
}

printMsg("hello world");

function total(a: number, b?: number) {
  if (b === undefined) {
    b = 0;
  }
  return a + b;
}

console.log(total(1));
console.log(total(1, 2));

function randomNumber(): number {
  return Math.random();
}

console.log(randomNumber());

// 对象类型
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });

// 可选属性

function printName(obj: { first: string; last?: string }) {
  if (obj.last !== undefined) {
    console.log(obj.first + " " + obj.last);
  } else {
    console.log(obj.first);
  }
}

printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });

function printId(id: number | string) {
  if (typeof id === "string") {
    id = id.toUpperCase();
  }
  console.log("Your id is: " + id);
}

printId(101);
printId("abc-123"); // Your id is: ABC-123

// 类型别名
type Student = { name: string; age: number };
function printStudent(student: Student) {
  console.log("Name: " + student.name);
  console.log("Age: " + student.age);
}

printStudent({ name: "张三", age: 18 });

// interface 定义类型别名

interface Student2 {
  name: string;
  age: number;
}
function printStudent2(student: Student2) {
  console.log("Name: " + student.name);
  console.log("Age: " + student.age);
}

printStudent2({ name: "张三", age: 18 });

// 扩展 interface

interface Student3 {
  name: string;
}

interface Student3 {
  age: number;
}

function printStudent3(student: Student3) {
  console.log("Name: " + student.name);
  console.log("Age: " + student.age);
}

// 用继承的方式扩展接口
interface Person {
  name: string;
  age: number;
}

interface Teacher extends Person {
  teach(): void;
}

// 扩展 type
type Person2 = { name: string; age: number };
type Teacher2 = Person2 & { teach(): void };

// 类型断言

// const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
// const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");

// 字面量类型
type WindowStates2 = "open" | "closed" | "minimized";
function setWindowState(state: WindowStates2) {
  console.log(state);
}

setWindowState("open");
setWindowState("closed");

type Configuration = {
  readonly databaseURL: string;
  readonly maxConnections: number;
};
function setConfig(configuration: Configuration | "auto") {
  let databaseURL: string;
  let maxConnections: number;
  if (configuration === "auto") {
    databaseURL = "https://example.com/db";
    maxConnections = 42;
  } else {
    databaseURL = configuration.databaseURL;
    maxConnections = configuration.maxConnections;
  }
  console.log(`databaseURL: ${databaseURL}`);
  console.log(`maxConnections: ${maxConnections}`);
}

setConfig({ databaseURL: "https://example.com/mydb", maxConnections: 111 });
setConfig("auto");

function handleRequest(url: string, method: "GET" | "POST") {
  console.log(`URL: ${url}`);
  console.log(`Method: ${method}`);
}
const request = {
  url: "https://example.com",
  method: "GET",
} as const;
handleRequest(request.url, request.method); // 类型 “string” 的参数不能赋给 类型 “"GET" | "POST"” 的参数。
// handleRequest(request.url, request.method as "GET");
handleRequest("https://example.com", "GET");

// strictNullChecks
function liveDangerously(x?: number | null) {
  if (x !== null && x !== undefined) {
    console.log(x.toFixed());
  }
}

liveDangerously(null);
liveDangerously(undefined);
liveDangerously();
liveDangerously(1);

function liveDangerously2(x?: number | null) {
  console.log(x!.toFixed());
}
