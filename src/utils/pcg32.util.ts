import {SeedPairModel} from "../models/seed-pair.model";

export class PCG32Random {
    private static readonly N = 6364136223846793005n;

    private state = 0x853c49e6748fea9bn;
    private inc   = 0xda3e39cb94b95bdbn;

    private MASK_64 = (1n << 64n) - 1n;


    setSeed(seedState: bigint, seedSequence: bigint): void {
        this.state = 0n;
        this.inc = (seedSequence << 1n) | 1n;
        this.nextInt();
        this.state += seedState;
        this.nextInt();
    }

    nextInt(): number {
        const old = this.state;
        this.state = (old * PCG32Random.N + this.inc) & this.MASK_64;

        const xorshifted = Number(((old >> 18n) ^ old) >> 27n) >>> 0;
        const rot = Number(old >> 59n) & 31;

        return ((xorshifted >>> rot) | (xorshifted << ((-rot) & 31))) >>> 0;
    }

    nextIntMax(max: number): number {
        if (max < 0) throw new Error("max must be >= 0");
        return this.nextValBetween(0, max);
    }

    nextUnsignedInt(): number {
        return this.nextInt() >>> 0;
    }

    nextValBetween(min: number, max: number): number {
        if (min > max) throw new Error("max must be >= min");
        const range = max - min;
        return (this.nextUnsignedInt() % range) + min;
    }

    nextFloat(): number {
        return this.nextUnsignedInt() / 2 ** 32;
    }

    static create(seed: SeedPairModel): PCG32Random {
        const pcg = new PCG32Random();
        pcg.setSeed(seed.state, seed.sequence);
        return pcg;
    }
}