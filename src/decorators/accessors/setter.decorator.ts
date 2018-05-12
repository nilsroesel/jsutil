import { createName, FunctionTypes } from './util';

export function Set(target: any, key: string) {
    const setter = createName(key, FunctionTypes.SET);
    target[setter] = function (value): void {
        this[key] = value;
    }
}
