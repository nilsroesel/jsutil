import { createName, FunctionTypes } from '../util';
import { toStringFactory } from './to-string.decorator';
import { generateAccessors } from './accessors.decorator';

export function Data<T extends { new(...args: any[]): {} }>(constructor: T) {
    const className: string = constructor.name;
    return class extends constructor {
        accessorGenerator = generateAccessors(this);
        toString = toStringFactory(className, this);
    }
}
