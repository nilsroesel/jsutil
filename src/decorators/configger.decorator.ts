export function Configger<T>(config: any, stdConfig: T) {
    let completeConfig: T = {} as T;
    for (let key in stdConfig) {
        completeConfig[key] = mergeKeys(config[key], stdConfig[key]);
    }
    return (target: any, key: string) => {
        target[key] = completeConfig;
    }
}

function mergeKeys(configProperty, stdConfigProperty): any {
    let evaluated = {};
    if (configProperty && stdConfigProperty instanceof Object && !(stdConfigProperty instanceof Array)) {
        for (let key in stdConfigProperty) {
            evaluated[key] = mergeKeys(configProperty[key], stdConfigProperty[key]);
        }
    } else if (stdConfigProperty instanceof Array) {
        evaluated = new Array();
        const biggerArray: Array<any> = ((configProperty as Array<any>).length > (stdConfigProperty as Array<any>).length)
            ? configProperty : stdConfigProperty;
        biggerArray.forEach((element, index) => {
            if (!(index > (configProperty as Array<any>).length - 1)) (evaluated as Array<any>).push((configProperty as Array<any>)[index]);
            else (evaluated as Array<any>).push(element);
        });
    } else {
        evaluated = stdConfigProperty;
        if (configProperty !== undefined) evaluated = configProperty;
    }
    return evaluated;
}
