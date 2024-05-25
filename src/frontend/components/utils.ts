export class Utils {
    static randomInt(min: number, max: number): number {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(
            Math.random() * (maxFloored - minCeiled) + minCeiled
        );
    }

    static random(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    static lerp(from: number, to: number, amount: number): number {
        return to + (from - to) * amount;
    }
}
