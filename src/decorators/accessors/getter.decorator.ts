import { createName, FunctionTypes } from '../util';

export function Get(target: any, key: string) {
    const getter = createName(key, FunctionTypes.GET);
    target[getter] = function () {
        return this[key];
    }
}
