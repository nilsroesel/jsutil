import { createName, FunctionTypes } from './util';

export function Get<T>(target: any, key: string) {
    const getter = createName(key, FunctionTypes.GET);
    target[getter] = function (): T {
        return target[key] as T;
    }
}
