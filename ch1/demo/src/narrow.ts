// 缩小
function concatStr(prefix: string | number, context: string) {
    if (typeof prefix === "number") {
        // 如果前缀是数字，返回若干个空格和字符串拼接的结果
        return " ".repeat(prefix) + context;
    }
    // 如果前缀是字符串，直接拼接后返回
    return prefix + context;
}
console.log(concatStr(2, "hello"))
console.log(concatStr("hello", "world"))

// null

// function printAll(strs: string | string[] | null) {
//     if (typeof strs === "object") {
//         for (const str of strs) { // 这里会报错——“strs”可能为“null”
//             console.log(str)
//         }
//     }
//     else if (typeof strs === "string") {
//         console.log(strs)
//     }
//     else {
//         // 你可能期望这里是 null
//     }
// }

// 真值缩小

function getUsersOnlineMessage(numUsersOnline: number) {
    if (numUsersOnline) {
        return `There are ${numUsersOnline} online now!`;
    }
    return "Nobody's here. :(";
}
console.log(getUsersOnlineMessage(11)) // There are 11 online now!
console.log(getUsersOnlineMessage(0)) // Nobody's here. :(

// Boolean("hello")
// !!"hello"

function printAll2(strs: string | string[] | null) {
    if (strs && typeof strs === "object") {
        for (const str of strs) {
            console.log(str)
        }
    }
    else if (typeof strs === "string") {
        console.log(strs)
    }
}
printAll2("hello")
printAll2(["how", "are", "you"])

function printAll3(strs: string | string[] | null) {
    if (strs) {
        if (typeof strs === "object") {
            for (const str of strs) {
                console.log(str)
            }
        }
        else if (typeof strs === "string") {
            console.log(strs)
        }
    }
}

printAll3("hello")
printAll3(["how", "are", "you"])
printAll3(null)
printAll3("")

// 相等缩小

function example(var1: string | number, var2: string | boolean) {
    if (var1 === var2) {
        // 这里 var1 和 var2 的类型必然都为 string 
        console.log(var1.toUpperCase());
        console.log(var2.toLowerCase());
    }
    else {
        console.log(var1);
        console.log(var2);
    }
}

example("hello", "world")
example(1, true)
example("hello", "hello")

function printAll5(strs: string | string[] | null) {
    if (strs !== null) {
        if (typeof strs === "object") {
            for (const str of strs) {
                console.log(str)
            }
        }
        else if (typeof strs === "string") {
            console.log(strs)
        }
    }
}

// in 缩小

type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim: () => void; fly: () => void };
function move(animal: Fish | Bird | Human) {
    if ("swim" in animal) {
        // 这里类型必然是 Fish 或 Human
        return animal.swim();
    }
    else {
        // 这里类型必然是 Bird 或 Human
        return animal.fly();
    }
}

move({ swim: () => { console.log("swim") } })
move({ fly: () => { console.log("fly") } })

// instance 缩小

function logValue(x: Date | string) {
    if (x instanceof Date) {
        console.log(x.toUTCString());
    }
    else {
        console.log(x.toUpperCase());
    }
}

logValue(new Date())
logValue("hello")

let x = Math.random() < 0.5 ? 10 : "hello world!";
// 缩小后，x 的类型为 number | string
x = 1
console.log(x)
// 缩小后，x 的类型为 number
x = "goodbye!"
console.log(x)
// 缩小后，x 的类型为 string
// x = true
// 报错，因为初始类型是 number | string，而 true 不属于 number | string

function example2() {
    let x: string | number | boolean;
    x = Math.random() < 0.5;
    console.log(x);
    // x 的类型被缩小为 boolean
    if (Math.random() < 0.5) {
        x = "hello";
        console.log(x);
        // x 的类型被缩小为 string
    } else {
        x = 100;
        console.log(x);
        // x 的类型被缩小为 number
    }
    return x;
    // x 的类型被缩小为 string | number
}

// 使用类型谓词

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

function getSmallPet(): Fish | Bird {
    if (Math.random() < 0.5) {
        return { swim: () => { console.log("swim") } };
    }
    return { fly: () => { console.log("fly") } };
}

let pet = getSmallPet();

if (isFish(pet)) {
    pet.swim();
} else {
    pet.fly();
}

const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1 = zoo.filter(isFish);
// 类型缩小为 Fish[]
const underWater2 = zoo.filter(isFish) as Fish[];
const underWater3 = zoo.filter((pet): pet is Fish => {
    return (pet as Fish).swim !== undefined;
});

// 区分联合

interface Shape {
    kind: "circle" | "square";
    radius?: number;
    sideLength?: number;
}

function getArea(shape: Shape) {
    if (shape.kind === "circle") {
        return Math.PI * shape.radius! ** 2;
        // 报错，“shape.radius”可能为“undefined”
    }
    return shape.sideLength! ** 2;
    // 报错，“shape.sideLength”可能为“undefined”
}

interface Circle {
    kind: "circle";
    radius: number;
}
interface Square {
    kind: "square";
    sideLength: number;
}
type Shape2 = Circle | Square;
function getArea2(shape: Shape2) { 
    if (shape.kind === "circle") {
        return Math.PI * shape.radius ** 2;
    }
    return shape.sideLength ** 2;
}
function getArea3(shape: Shape2){
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
    }
}

console.log(getArea3({ kind: "circle", radius: 5 }))
console.log(getArea3({ kind: "square", sideLength: 10 }))

function getArea4(shape: Shape2) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
        default:
            const _exhaustiveCheck: never = shape;
            return _exhaustiveCheck;
    }
}

interface Triangle {
  kind: "triangle";
  sideLength: number;
}
type Shape3 = Circle | Square | Triangle;
function getArea5(shape: Shape3) { 
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
        default:
            // const _exhaustiveCheck: never = shape;
            // 这里会报错，不能将类型“Triangle”分配给类型“never”。
            // return _exhaustiveCheck;
    }
}
