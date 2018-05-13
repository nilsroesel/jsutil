export function ToString<T extends { new(...args: any[]): {} }>(constructor: T) {
    const className: string = constructor.name;
    return class extends constructor {
        toString = toStringFactory(className, this);
    }
}

export function toStringFactory(className, target): Function {
    return (formatCallback?: Function) => {
        let stringBuilder: string = `[${className}] {`;
        for (let key in target) {
            if (typeof target[key] !== 'function' && !!target[key]) {
                let keyVal: any = target[key];
                if (target[key].toString !== undefined) { keyVal = target[key].toString(); }
                else if (target[key].stringify !== undefined) { keyVal = target[key].stringify(); }
                stringBuilder += `${key} = ${keyVal} \n`;
            }
        }
        stringBuilder += '}';
        if (formatCallback !== undefined) stringBuilder = formatCallback(stringBuilder);
        return stringBuilder;
    }
}
