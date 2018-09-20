export class Optional<T> {

    private readonly value: T;

    private static EMPTY = Object.freeze(Optional.ofNullable(null));

    private constructor(value: T) { this.value = value; }

    /**
     * Returns an Optional with the specified present non-null value.
     * T - the class of the value
     * @param value the value to be present, which must be non-null
     * @return an Optional with the value present
     * @throws NullOrUndefinedException if value is null or undefined
     */
    static of<T>(value: T): Optional<T> {
        if(!value) throw new NullOrUndefinedError();
        else return new Optional<T>(value);
    }

    /**
     * Returns an Optional with the specified present non-null value. Or empty Optional if unspecified
     * T - the class of the value
     * @param value the value to be present, which must be non-null
     * @return an Optional with the value present
     */
    static ofNullable<T>(value: T): Optional<T> { return new Optional<T>(value); }

    /**
     * Returns an empty Optional instance. No value is present for this Optional.
     * T - the class of the value
     * @return an empty Optional
     */
    static empty<T>(): Optional<T> { return (Optional.EMPTY as Optional<T>); }

    /**
     * If a value is present in this Optional, returns the value, otherwise throws NoSuchElementException.
     * @return the non-null value held by this Optional
     * @throws NoSuchElementException if there is no value present
     */
    get(): T {
        if(!this.value) throw new NullOrUndefinedError();
        return this.value;
    }

    /**
     * Return the value if present, otherwise return other.
     * @param elseValue the value to be returned if there is no value present, may be null
     */
    orElse(elseValue: T): T {
        if(this.value) return this.value;
        else return elseValue;
    }

    /**
     * If a value is present, invoke the specified consumer with the value, otherwise do nothing.
     * @param consumer a predicate to apply to the value, if present
     * @throws NullOrUndefinedError if value is present and consumer not callable
     */
    ifPresent(consumer: (value: T) => void) {
        if(!consumer) throw new NullOrUndefinedError();
        if(this.value) consumer(this.value);
    }

    /**
     * Return true if there is a value present, otherwise false.
     * @return true if there is a value present, otherwise false
     */
    isPresent(): boolean { return !!this.value; }

    /**
     * If a value is present, and the value matches the given predicate, return an Optional describing the value, otherwise return an empty Optional.
     * @param predicate a predicate to apply to the value, if present
     * @return an Optional describing the value of this Optional if a value is present and the value matches the given predicate, otherwise an empty Optional
     * @throws NullOrUndefinedError if predicate is null
     */
    filter(predicate: (value: T) => boolean): Optional<T> {
        if(!predicate) throw new NullOrUndefinedError();
        if(!this.value || predicate(this.value)) return this;
        else return (Optional.EMPTY as Optional<T>);
    }

    /**
     * If a value is present, apply the provided mapping function to it, and if the result is non-null, return an Optional describing the result. Otherwise return an empty Optional.
     * R - the return type of the mapper
     * @param callback a mapping function to apply to the value, if present
     * @return an Optional describing the result of applying a mapping function to the value of this Optional, if a value is present, otherwise an empty Optional
     * @throws NullOrUndefinedError if mapping function is not callable
     *
     */
    map<R>(callback: (value: T) => Optional<R>) {
        if(!callback) throw new NullOrUndefinedError();
        if(!!this.value) return Optional.EMPTY;
        else return Optional.of(callback(this.value));
    }

}

class NullOrUndefinedError extends Error {
    constructor() { super('Optional Value is null or undefined'); }
}
