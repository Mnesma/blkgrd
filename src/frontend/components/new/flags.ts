enum FlagState {
    Set = "set",
    Unset = "unset"
}

export enum FlagsMode {
    Or = "or",
    Xor = "xor"
}

export class Flag {
    public value: number;

    private static flagCount = 0;

    private eventNames: Record<FlagState, string>;

    constructor() {
        this.value = 2 ** Flag.flagCount++;

        this.eventNames = {
            [FlagState.Set]: `${FlagState.Set}${this.value}`,
            [FlagState.Unset]: `${FlagState.Unset}${this.value}`
        };
    }

    public isSet(): string {
        return this.eventNames[FlagState.Set];
    }

    public isUnset(): string {
        return this.eventNames[FlagState.Unset];
    }
}

export class Flags extends EventTarget {
    private individualActiveFlags = new Set<Flag>();
    private activeFlags = 0;

    constructor(private mode: FlagsMode) {
        super();
    }

    public set(flag: Flag): void {
        if (this.mode === FlagsMode.Xor) {
            this.reset();
        }

        this.activeFlags |= flag.value;
        this.individualActiveFlags.add(flag);
        this.dispatchEvent(new Event(flag.isSet()));
    }

    public unset(flag: Flag): void {
        this.activeFlags &= ~flag.value;
        this.individualActiveFlags.delete(flag);
        this.dispatchEvent(new Event(flag.isUnset()));
    }

    public toggle(flag: Flag): void {
        if (this.has(flag)) {
            this.unset(flag);
        } else {
            this.set(flag);
        }
    }

    public has(flag: Flag): boolean {
        return (this.activeFlags & flag.value) > 0;
    }

    public reset(): void {
        this.individualActiveFlags.forEach((flag) => {
            this.unset(flag);
        });
    }
}
