export const DEFAULT_NAME = 'Tom';
export const DEFAULT_AGE = 18;
export class Person {
    name: string;
    age: number;
    constructor(name: string = DEFAULT_NAME, age: number = DEFAULT_AGE) {
        this.name = name;
        this.age = age;
    }
}
export function createPerson(){
    return new Person();
}
export default {
    Person,
    createPerson
}