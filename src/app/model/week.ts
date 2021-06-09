import { Module } from "./module";

export class Week {
    blocks: Map<number, Map<number, Block>> = new Map;

    constructor() {
        for (let blockIndex = 1; blockIndex < 5; blockIndex++) {
            this.blocks.set(blockIndex, new Map);
            for (let dayOfWeek = 1; dayOfWeek < 7; dayOfWeek++) {
                this.blocks.get(blockIndex)?.set(dayOfWeek, new Block(blockIndex, dayOfWeek));
            }
        }
    }
}

export enum WeekDay {
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6,
    SUNDAY = 7,

}
export function valueOf(weekDay: string): WeekDay {
    return WeekDay[weekDay as keyof typeof WeekDay];
}

export class Block {
    modules: Module[] = [];

    constructor(public index: number, public day: WeekDay) {
    }
}
