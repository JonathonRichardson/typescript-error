export class Some<T> {
    constructor(public readonly value: T) {

    }
    public getValue(): T {
        return this.value;
    }
}

export class None {}

export type Option<T> = Some<T> | None;