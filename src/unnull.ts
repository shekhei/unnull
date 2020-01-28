export type UnaryFn<I, O> = (i: I) => O
export type NullaryFn<O> = () => O

export type Unnull<T> = Some<T> | None<T>;

export function Unnull<T>(value?: T | null): Unnull<T> {
    if ( isSomeVal(value) ) {
        return new Some(value);
    }
    return new None<T>();
}

function isNoneVal<T>(a?: T | null): a is null | undefined {
    if ( a === null || a === undefined ) {
        return true;
    }
    return false;
}

function isSomeVal<T>(a?: T | null ): a is NonNullable<T> {
    return !isNoneVal(a);
}

interface UnnullInterface<T> {
    isSome(): Boolean;
    isNone(): Boolean;
    map<O>(mapper: UnaryFn<T, O>): Unnull<O> | Unnull<T>;
    flatMap<O>(mapper: UnaryFn<Unnull<T>, Unnull<O>>): Unnull<O>;
    fold<O>(defaultCtr: NullaryFn<O>, foldr: UnaryFn<T, O>): O;
    unwrap(defaultCtr: NullaryFn<T>): T;
}

class None<T> implements UnnullInterface<T> {
    constructor() {}
    isSome() { return false }
    isNone() { return true }
    map<O>(_mapper: UnaryFn<T, O>): Unnull<O> | Unnull<T> { return this }
    flatMap<O>(mapper: UnaryFn<Unnull<T>, Unnull<O>>): Unnull<O> { return mapper(this) }
    fold<O>(defaultCtr: NullaryFn<O>, _foldr: UnaryFn<T, O>): O {
        return defaultCtr()
    }
    unwrap(defaultCtr: NullaryFn<T>): T {
        return defaultCtr()
    }
}

class Some<T> implements UnnullInterface<T> {
    constructor(private val: T) {}
    isSome() { return true }
    isNone() { return false }
    map<O>(mapper: UnaryFn<T, O>): Unnull<O> | Unnull<T> { return Unnull(mapper(this.val)) }
    flatMap<O>(mapper: UnaryFn<Unnull<T>, Unnull<O>>): Unnull<O> { return mapper(this) }
    fold<O>(_defaultCtr: NullaryFn<O>, foldr: UnaryFn<T, O>): O {
        return foldr(this.val)
    }
    unwrap(_defaultCtr: NullaryFn<T>): T {
        return this.val;
    }
}