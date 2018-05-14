import { createName, FunctionTypes } from '../util';

export function Accessors<T extends { new(...args: any[]): {} }>(constructor: T) {
    const className: string = constructor.name;
    return class extends constructor {
        accessorGenerator = generateAccessors(this);
    }
}

export function generateAccessors(target) {
    for (let key in target) {
        target[createName(key, FunctionTypes.GET)] = () => { return target[key]; }
        target[createName(key, FunctionTypes.SET)] = (value): void => { target[key] = value; }
    }
}
