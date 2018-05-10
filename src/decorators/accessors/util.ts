export function createName(key: string, functionType: FunctionTypes): string {
    return functionType + key.charAt(0).toUpperCase() + key.slice(1);
}

export enum FunctionTypes {
    GET = 'get',
    SET = 'set'
}
