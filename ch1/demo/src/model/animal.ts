interface Animal {
    age: number;
    eat: () => void;
}

export interface Dog extends Animal {
    bark: () => void;
}

export interface Cat extends Animal {
    meow: () => void;
}

export function createDog(): Dog {
    return {
        age: 0,
        bark: () => {},
        eat: () => {}
    };
}