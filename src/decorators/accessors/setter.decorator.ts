import { createName, FunctionTypes } from './util';

export function Set<T>(target: any, key: string) {
    const setter = createName(key, FunctionTypes.SET);
    target[setter] = function (value: T): void {
        target[key] = value;
    }
}
