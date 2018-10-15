export class UtilMap<K, V> extends Map<K, V> implements Mappable {

    constructor(...args) { super(args); }

    static createES5UtilMap<K, V>(...args: any[]): UtilMap<K, V> {
        const map = new Map(args);
        map['__proto__'] = UtilMap.prototype;
        return map as UtilMap<K, V>;
    }

    /**
     * Transform all map values by the given function
     * @param supplier function to transform the object. takes the map value as first argument and the key as second
     * @return UtilMap<K, R> with transformed values
     * R - return type of the mapping function and new value type for the returned map
     */
    public map<R>(supplier: (value: V, key?: K) => R): UtilMap<K, R> {
        const mapped: UtilMap<K, R> = new UtilMap();
        this.forEach(((value: V, key: K) => mapped.set(key, supplier(value, key)) ));
        return mapped;
    };

    /**
     * Returns either the key value or if not present, the default value
     * @param key
     * @param defaultValue if key is not in map
     * @return map value if map has key, or the given default value
     */
    public getOrDefault(key: K, defaultValue: V): V { return this.get(key) || defaultValue; }

    /**
     * Get all map values that matching a given criteria
     * @param predicate filter function to filter the object. takes the map value as first argument and the key as second
     * @return UtilMap<K, V> with all matching map entries
     */
    public filter(predicate: (value: V, key?: K) => boolean): UtilMap<K, V> {
        const filtered: UtilMap<K, V> = new UtilMap();
        this.forEach((value, key) => {
            if(predicate(value, key)) filtered.set(key, value);
        });
        return filtered;
    }

}

export interface Mappable { map<R>(supplier: () => R); }
