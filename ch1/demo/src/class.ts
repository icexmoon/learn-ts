class Point { }
const point = new Point();

// class Point2{
//     x: number; // 报错
//     y: number; // 报错
// }

class Point2 {  // 创建类
    x: number = 0;  // 创建属性
    y: number = 0;  // 创建属性
}

class Point3 {
    x = 0;  // 推断出的类型为 number
    y = 0;  // 推断出的类型为 number
}

class Point4 {
    x: number;
    y: number;
    constructor(x: number, y: number) {  // 创建构造函数
        this.x = x;  // 创建属性
        this.y = y;  // 创建属性
    }
}

// class Point5{
//     x; // 警告，成员“x”隐式地具有“any”类型。
//     y; // 警告，成员“y”隐式地具有“any”类型。
// }

class Point6 {
    x!: number;
    y!: number;
}

class Person {
    readonly name: string = 'new person';
    constructor(name?: string) {
        if (name) {
            this.name = name;
        }
    }
    setName(name: string): void {
        // this.name = name; // 报错，无法为“name”赋值，因为它是只读属性
    }
}

const p = new Person('Tom');
console.log(p.name);
// p.name = 'Jerry'; // 报错，无法为“name”赋值，因为它是只读属性

class Point7 {
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number);
    constructor(x: string, y: string);
    constructor(x: number | string, y: number | string) {
        if (typeof x === 'string') {
            this.x = Number(x)
        }
        else {
            this.x = x
        }
        if (typeof y === 'string') {
            this.y = Number(y)
        }
        else {
            this.y = y
        }
    }
}

const p2 = new Point7(1, 2);
const p3 = new Point7('1', '2');
console.log(p2);
console.log(p3);

class Animal { }

class Dog extends Animal {
    owner: string;
    constructor(owner: string) {
        super();
        this.owner = owner;
    }
}

const dog = new Dog('Tom');

const name = 'Bruce';

class Person2 {
    name: string;
    age: number;
    constructor(name: string, age: number = 20) {
        this.name = name;
        this.age = age;
    }
    test() {
        console.log(name); // 这里的 name 是 Bruce
    }
}

const p5 = new Person2('Tom');
const p6 = new Person2('Jerry', 18);
console.log(p5);
console.log(p6);

class Person3 {
    _name: string = '';
    get name(): string {
        console.log('getter');
        return this._name;
    }
    set name(value: string) {
        console.log('setter');
        this._name = value;
    }
}

const p7 = new Person3();
p7.name = 'Bruce';
console.log(p7.name);

class Person4 {
    _name: string = '';
    set name(value: string | number) {
        if (typeof value === 'number') {
            if (value > 0) {
                this._name = 'Tom';
            }
            else {
                this._name = 'Jerry';
            }
        }
        else {
            this._name = value;
        }
    }
    get name(): string {
        return this._name;
    }
}

let person4 = new Person4();
person4.name = 1;
console.log(person4.name); // Tom
person4.name = -1;
console.log(person4.name); // Jerry

class CheckList {
    [key: string]: boolean | ((key: string) => boolean);
    check(key: string): boolean {
        return this[key] as boolean;
    }
}

interface Flyable {
    fly(): void;
}

class Bird implements Flyable {
    fly() {
        console.log('Bird is flying');
    }
}

const bird = new Bird();
bird.fly();

interface PointInterface {
    x: number;
    y?: number;
}

class Point8 implements PointInterface {
    x: number = 0;
}

const point2 = new Point8();
point2.x = 10;
// point2.y = 20; // 报错，类型“Point8”上不存在属性“y”

class Animal2 {
    age: number = 1;
    eat(food: string) {
        console.log('吃：' + food);
    }
}

class Dog2 extends Animal2 {
    bark() { }
}

class Cat2 extends Animal2 {
    meow() { }
    eat(food: string, where?: string) {
        if (where === undefined) {
            super.eat(food);
        }
        else {
            console.log('吃：' + food + '，在：' + where);
        }
    }
}

const cat1 = new Cat2();
cat1.eat('猫粮');
cat1.eat('猫粮', '猫窝');

const cat2: Animal2 = new Cat2();
cat2.eat('猫粮');

class Animal3 {
    readonly kind: string = '';
}

class Cat3 extends Animal3 {
    readonly kind: string = '猫科';
}

class AnimalHouse3 {
    hold: Animal3;
    constructor(animal: Animal3) {
        this.hold = animal;
    }
}

class CatHouse3 extends AnimalHouse3 {
    declare hold: Cat3;
    constructor(cat: Cat3) {
        super(cat);
    }
}

const cat3 = new Cat3();
console.log(cat3);

const catHouse3 = new CatHouse3(cat3);
console.log(catHouse3);
console.log(catHouse3.hold); // 这里 catHourse3.hold 是 Animal3 类型

class Parent {
    age: number = 1;
    constructor() {
        console.log(this.age);
    }
}

class Child extends Parent {
    age: number = 2;
    constructor() {
        super();
        console.log(this.age);
    }
}

const child = new Child();

class Parent2 {
    private privateAttr: number = 1;
    protected protectedAttr: number = 2;
    public publicAttr: number = 3;
    defaultAttr: number = 4;
}

const parent2 = new Parent2();
console.log(parent2.defaultAttr);
console.log(parent2.publicAttr);
// console.log(parent2.protectedAttr); // 报错
// console.log(parent2.privateAttr); // 报错

class parent3 {
    protected func1(): void {
        console.log('parent.func1');
    }
}

class Child3 extends parent3 {
    public func1(): void {
        console.log('child.func1');
    }
}

const child3 = new Child3();
child3.func1();

// 静态成员

class Parent4 {
    static staticAttr: number = 1;
    static staticFunc(): void {
        console.log('staticFunc');
    }
}

console.log(Parent4.staticAttr);
Parent4.staticFunc();

class Parent5 {
    private static staticAttr: number = 1;
}
// console.log(Parent5.staticAttr); // 报错

class Parent6 {
    static staticAttr: number = 1;
    static staticFunc(): void {
        console.log('parent.staticFunc', this.staticAttr);
    }
}

class Child6 extends Parent6 {
    static staticAttr: number = 2;
    static staticFunc(): void {
        console.log('child.staticFunc', this.staticAttr);
    }
}

Parent6.staticFunc(); // parent.staticFunc 1
Child6.staticFunc(); // child.staticFunc 2

class MyClass {
    // static name = 'MyClass';
    // 报错，静态属性“name”与构造函数“MyClass”的内置属性函数“name”冲突
    // static length = 10;
    // 静态属性“length”与构造函数“MyClass”的内置属性函数“length”冲突
}

// 没有静态类

function myFunc() {
    console.log('myFunc');
}

class MyClass2 {
    func1() {
        myFunc();
    }
}

const myClass2 = new MyClass2();
myClass2.func1();

// 静态初始化块

class MyClass3 {
    static a: number;
    static {
        MyClass3.a = 1;
    }
}

console.log(MyClass3.a);

// 泛型类

class Box<T> {
    value: T;
    constructor(value: T) {
        this.value = value;
    }
}

const box1 = new Box('hello'); // 类型推断为 Box<string>

class MyClass4<T> {
    // static a: T; // 报错，静态成员不能引用类类型参数
}

class MyClass5 {
    name: string = 'MyClass5';
    getName(): string {
        return this.name;
    }
}

const myClass5 = new MyClass5();

class MyClass6 {
    name: string = 'MyClass6';
    getName = myClass5.getName;
}

const myClass6 = new MyClass6();
console.log(myClass6.getName());


class MyClass7 {
    name: string = 'MyClass7';
    getName(): string {
        return this.name;
    }
}

const myClass7 = new MyClass7();
const getName = myClass7.getName;
// console.log(getName()); 
// 报错，TypeError: Cannot read properties of undefined (reading 'name')

class MyClass8 {
    name: string = 'MyClass8';
    getName = () => {
        return this.name;
    }
}

const myClass8 = new MyClass8();
const getName2 = myClass8.getName;
console.log(getName2());

class Parent7 {
    name: string = 'Parent7';
    getName = () => {
        return this.name;
    }
}

class Child7 extends Parent7 {
    name: string = 'Child7';
    getName = () => {
        // super.getName(); 
        // 报错，父类字段“getName”无法通过 super 在子类中访问
        return this.name;
    }
}

const child7 = new Child7();
console.log(child7.getName());

class Parent8 {
    name: string = 'parent8';
    getName(this: Parent8) {
        return this.name;
    }
}

const parent8 = new Parent8();
const getName3 = parent8.getName;
// console.log(getName3());
// 报错，类型为“void”的 “this” 上下文不能分配给类型为“Parent8”的方法的 “this”。

// 特殊类型 this
class Parent9 {
    name: string = 'parent9';
    setName(newName: string) { // 这里推断出的返回值类型是 this
        this.name = newName;
        return this;
    }
}

class Child9 extends Parent9 {
}

const child9 = new Child9();
const child9Name = child9.setName('child9'); // 推断类型为 Child9

class MyNumber {
    value: number;
    constructor(value: number) {
        this.value = value;
    }
    compare(other: MyNumber): -1 | 0 | 1 {
        return this.value === other.value ? 0 : this.value > other.value ? 1 : -1;
    }
}

class SubMyNumber extends MyNumber {
    name: string = 'SubMyNumber2';
    constructor(value: number) {
        super(value);
    }
}

const myNumber = new MyNumber(1);
const subMyNumber = new SubMyNumber(2);
console.log(myNumber.compare(subMyNumber));
console.log(subMyNumber.compare(myNumber));


class MyNumber2 {
    value: number;
    constructor(value: number) {
        this.value = value;
    }
    compare(other: this): -1 | 0 | 1 {
        return this.value === other.value ? 0 : this.value > other.value ? 1 : -1;
    }
}

class SubMyNumber2 extends MyNumber2 {
    name: string = 'SubMyNumber2';
    constructor(value: number) {
        super(value);
    }
}

const myNumber2 = new MyNumber2(1);
const subMyNumber2 = new SubMyNumber2(2);
console.log(myNumber2.compare(subMyNumber2));
// console.log(subMyNumber2.compare(myNumber2));
// 报错，类型“MyNumber2”的参数不能赋给类型“SubMyNumber2”的参数

// 基于 this 的类型守卫
class Animal4 {
    kind: string = '';
    isDog(): this is Dog4 {
        return this.kind === 'dog';
    }
    isCat(): this is Cat4 {
        return this instanceof Cat4;
    }
}

class Dog4 extends Animal4 {
    kind: 'dog' = 'dog';
    bark(): void {
        console.log('bark');
    }
}

class Cat4 extends Animal4 {
    kind: 'cat' = 'cat';
    meow(): void {
        console.log('meow');
    }
}

const animal4: Animal4 = new Cat4();
if (animal4.isDog()) {
    animal4.bark(); // 类型推断为 Dog4
} else if (animal4.isCat()) {
    animal4.meow(); // 类型推断为 Cat4
}


class Box10<T> {
    value?: T;
    hasValue(): this is { value: T } {
        return this.value !== undefined;
    }
}

const box10 = new Box10<string>();
box10.value = 'hello';
if (box10.hasValue()) {
    console.log(box10.value.toUpperCase());
}

class Person8 {
    constructor(public name: string, public age: number) {
    }
}

const p8 = new Person8('Alice', 18);
console.log(p8.name, p8.age);

const Person9 = class {
    constructor(public name: string, public age: number) {
    }
}
const p9 = new Person9('Alice', 18);
console.log(p9.name, p9.age);

class Person10 {
    constructor(public name: string, public age: number) {
    }
}

type PersonInstanceType = InstanceType<typeof Person10>;
function printPerson(person: PersonInstanceType) {
    console.log(person.name, person.age);
}

const p10 = new Person10('Alice', 20);
printPerson(p10);

abstract class Conveyance {
    abstract start(): void;
    abstract stop(): void;
    move(): void {
        this.start();
        this.stop();
    }
}

class Car extends Conveyance {
    start(): void {
        console.log('Car started');
    }
    stop(): void {
        console.log('Car stopped');
    }
}

class Bike extends Conveyance {
    start(): void {
        console.log('Bike started');
    }
    stop(): void {
        console.log('Bike stopped');
    }
}

const car = new Car();
car.move();
const bike = new Bike();
bike.move();

// function careteConveyance(ConceyanceType: typeof Conveyance): Conveyance{
// return new ConceyanceType(); // 报错，无法创建抽象类的实例
// }

function careteConveyance(ConceyanceType: new () => Conveyance): Conveyance {
    return new ConceyanceType();
}

const car2 = careteConveyance(Car);
const bike2 = careteConveyance(Bike);
car2.move();
bike2.move();

class Person11 {
    name: string = '';
    age: number = 0;
}

class Person12 {
    name: string = '';
    age: number = 0;
}

const person12: Person12 = new Person11();

class Empty { }

function dealEmpty(empty: Empty): void {
    console.log(empty);
}

dealEmpty(new Empty());
dealEmpty(new Person11());
dealEmpty({ age: 18 });