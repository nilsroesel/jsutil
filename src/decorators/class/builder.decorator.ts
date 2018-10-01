import { FunctionTypes } from '../util';

export type StaticInstance<T> = { new(): T };

export interface ObjectBuilder<C> {
    // [FunctionTypes.BUILD]: () => C;
}

export function Builder<C>() {
    return <T extends { new(...args: any[]): {} }>(constructor: T) => {
        return class extends constructor {
            static Builder = function (this: StaticInstance<C>) {
                const genericBuilderTarget: C = new this() as C;
                let builderObject: ObjectBuilder<C> = Object.assign({});
                generateBuilderSetters(builderObject, genericBuilderTarget);
                builderObject[FunctionTypes.BUILD] = () => genericBuilderTarget as C;
                return builderObject as ObjectBuilder<C>;
            }
        }
    }
}

function generateBuilderSetters(builder, target) {
    for (let key in target) {
        builder[key] = (value): Object => {
            target[key] = value;
            return builder;
        };
    }
}
