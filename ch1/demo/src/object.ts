// 对象类型

// type Person = { name: string, age: number };
interface Person {
    name: string,
    age: number
}
function printUser(user: Person): void {
    console.log("姓名：" + user.name + "，年龄：" + user.age);
}
printUser({ name: "icexmoon", age: 15 });

interface Circle {
    radius: number,
    positionX?: number,
    positionY?: number
}

function printCircle(circle: Circle) {
    let positionX = 0;
    let positionY = 0;
    if (circle.positionX !== undefined) {
        positionX = circle.positionX;
    }
    if (circle.positionY !== undefined) {
        positionY = circle.positionY;
    }
    console.log("圆心（" + positionX + "," + positionY + "），半径：" + circle.radius);
}
printCircle({ radius: 1 });
printCircle({ positionX: 2, radius: 3 })
printCircle({ positionX: 3, positionY: 5, radius: 1 })

function printCircle2({ radius, positionX = 0, positionY = 0 }: Circle) {
    console.log("圆心（" + positionX + "," + positionY + "），半径：" + radius);
}

printCircle2({ radius: 1 });
printCircle2({ positionX: 2, radius: 3 })
printCircle2({ positionX: 1, positionY: 1, radius: 1 })

// 只读属性

// interface Person {
//     readonly id: number,
//     name: string,
//     age: number
// }

// function handlerPerson(person: Person){
//     person.name = "icexmoon";
//     person.age = 19;
//     person.id = 123; // 报错，无法为“id”赋值，因为它是只读属性
// }

interface Person2 {
    name: string,
    age: number
    pet: {
        kind: "dog" | "cat",
        name: string
    }
}

function handlePerson2(person: Person2) {
    person.name = 'LiLei';
    person.age = 11;
    person.pet.kind = 'cat';
    person.pet.name = 'Tom';
}

interface ReadOnlyPerson {
    readonly name: string,
    readonly age: number
}

interface WritablePerson {
    name: string,
    age: number
}

const person1: WritablePerson = { name: "Tom", age: 11 };
const person2: ReadOnlyPerson = person1;
console.log(person2); // { name: 'Tom', age: 11 }
person1.age = 15;
console.log(person2); // { name: 'Tom', age: 15 }

// 索引签名

const person5 = {
    name: 'Tom',
    age: 15
}

console.log(person5['name'])
console.log(person5['age'])

interface Person3 {
    [index: string]: string | number;
    name: string;
    age: number;
}
const person6: Person3 = { name: 'Jack', age: 16 };

interface StringArr {
    readonly [index: number]: string;
}

function generateStringArr(): StringArr {
    const arr = [];
    arr[0] = 'hello';
    arr[1] = 'world';
    return arr;
}

const stringArr = generateStringArr();
// stringArr[1] = 'how'; // 报错，类型“StringArr”中的索引签名仅允许读取

// 多余属性检查

interface SquareConfig {
    color?: string;
    width?: number;
}

function setSquareConfig(config: SquareConfig): void {
    console.log(`color:${config.color},width:${config.width}`);
}

// setSquareConfig({colour:"red", width: 15}); // 报错，对象字面量只能指定已知的属性
setSquareConfig({ colour: "red", width: 15 } as SquareConfig);
const squareConfig = { colour: "red", width: 15 };
setSquareConfig(squareConfig);

interface Person7 {
    name: string;
    age: number;
    [index: string]: unknown;
}

function handlePerson(person: Person7) {
    console.log(person)
}

handlePerson({ name: 'Tom', age: 15, school: '一中' });

interface Person8 {
    name: string;
    age: number;
}

interface Student extends Person8 {
    school: string;
}

function handleStudent(student: Student): void {
    console.log(student);
}
handleStudent({ name: 'Tom', age: 15, school: '一中' });

interface Circle {
    radius: number;
}

interface Colorful {
    color: string;
}

interface ColorfulCircle extends Circle, Colorful {

}

function handleColorfulCircle(colorfulCircle: ColorfulCircle) {
    console.log(colorfulCircle);
}

handleColorfulCircle({ radius: 11, color: 'red' });

type ColorfulCircle2 = Circle & Colorful;
function handleColorfulCircle2(colorfulCircle: ColorfulCircle2) {
    console.log(colorfulCircle);
}
handleColorfulCircle2({ radius: 11, color: 'red' });

function handleColorfulCircle3(colorfulCircle: Colorful & Circle) {
    console.log(colorfulCircle);
}

interface Person10 {
    id: number;
    name: string;
}

interface Person10 {
    id: number;
    age: number;
}

function handlePerson10(person: Person10) {
    console.log(person.id);
    console.log(person.name);
    console.log(person.age);
}

interface Person11 {
    id: number;
}

// interface Person11{
//     id: string; // 报错，后续属性声明必须属于同一类型
// }

interface Pet2 {
    id: number;
}

interface Pet3 {
    id: string;
}

type Pet5 = Pet2 & Pet3;
declare const pet: Pet5;
// pet.id; // 这里 id 推断出的类型是 never

interface Box {
    content: any
}

function setContent(box: Box, content: any) {
    box.content = content;
}

let box: Box = { content: null };
setContent(box, 123);
box.content.toFixed(2); // 这里的 box.content 类型推断是 any
console.log(box.content)

interface NumberBox {
    content: number
}

interface StringBox {
    content: string
}

interface BooleanBox {
    content: boolean
}

function setContent3(box: NumberBox, content: number): void;
function setContent3(box: StringBox, content: string): void;
function setContent3(box: BooleanBox, content: boolean): void;
function setContent3(box: { content: any }, content: any): void {
    box.content = content;
}

interface Box2<Type> {
    content: Type
}

function setContent2<Type>(box: Box2<Type>, content: Type) {
    box.content = content;
}

let box2: Box2<number> = { content: 0 };
setContent2(box2, 123);
box2.content.toFixed(2);
console.log(box2.content)

interface Apple {
    color: string;
    weight: number;
}

type AppleBox = Box2<Apple>;

type Box5<Type> = { content: Type };

type OneOrNull<Type> = Type | null;
type OneOrMany<Type> = Type | Type[];
type OneOrManyOrNull<Type> = OneOrMany<Type> | null;
type OneOrManyOrNullOrString = OneOrManyOrNull<string>;

function printFirst<Type>(arr: Array<Type>) {
    console.log(arr[0]);
}

printFirst([1, 2, 3]);
printFirst(new Array('a', 'b', 'c'));

function printFirst2<Type>(arr: Type[]) {
    console.log(arr[0]);
}

function printFirst3<Type>(arr: ReadonlyArray<Type>) {
    console.log(arr[0]);
    // arr.push(1); // 报错，类型“readonly Type[]”上不存在属性“push”。
}

printFirst3([1, 2, 3]);
printFirst3(new Array('a', 'b', 'c'));

function printFirst4<Type>(arr: readonly Type[]) {
    console.log(arr[0]);
    // arr.push(5); // 错误，类型“readonly Type[]”上不存在属性“push”。
}

function dealTuple(tuple: [number, string]) {
    console.log(tuple[0]);
    console.log(tuple.length); // 这里的 tuple.length 类型推断是 2
}

dealTuple([1, '2']);

function dealTuple2(tuple: [number, string]) {
    const [a, b] = tuple;
    console.log(a);
    console.log(b);
}

dealTuple2([1, '2']);

type TwoOrThreeTuple = [number, number, number?]
function dealTupele3(tuple: TwoOrThreeTuple) {
    const [a, b, c] = tuple;
    console.log(a);
    console.log(b);
    console.log(c); // 类型推断是 number|undefined
}

type NumberStringBooleans = [number, string, ...boolean[]]
type NumberStringsBoolean = [number, ...string[], boolean]
type NumbersStringBoolean = [...number[], string, boolean]

const tuple1: NumberStringBooleans = [1, '2', true, false];
const tuple2: NumberStringsBoolean = [1, '2', '3', true];
const tuple3: NumbersStringBoolean = [1, 2, 3, '2', true];

function doSomething(...args: [number, string, ...boolean[]]) {
    const [arg1, arg2, ...arg3] = args;
}

function doSomething2(arg1: number, arg2: string, ...arg3: boolean[]) {

}

// 只读元组
function printTuple(tuple: readonly [string, number]): void {
    const [a, b] = tuple;
    // tuple[0] = '1'; // 报错，无法为“0”赋值，因为它是只读属性。
}

let tuple5 = ['1',2];
// printTuple(tuple5); // 报错，类型(string|number)[] 不能分配给类型 readonly [string, number]

let tuple6 = ['1',2] as const;
printTuple(tuple6);

