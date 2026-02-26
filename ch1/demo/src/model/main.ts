import hello from './hello.js';
console.log(hello());

import {pi as math_pi,add,square} from './math_utils.js';
console.log(math_pi);
console.log(add(1,2));
console.log(square(2));

import * as math_utils from './math_utils.js';
console.log(math_utils.pi);
console.log(math_utils.add(1,2));
console.log(math_utils.square(2));

import person_model,{DEFAULT_NAME,DEFAULT_AGE} from './person.js';
console.log(person_model.createPerson());
console.log(DEFAULT_NAME);
console.log(DEFAULT_AGE);

import './hello.js';

import {type Cat, type Dog, createDog} from './animal.js'
function playCat(cat: Cat){
    cat.meow();
    cat.eat();
}

type Animal = Cat | Dog;

// import type {add as add_func} from './math_utils.js';
// add_func(5,6);
// 报错，“add_func”是使用 “import type”导入的，因此不能用作值。


