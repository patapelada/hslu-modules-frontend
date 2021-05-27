import { Module } from "./module";
import { SemesterType } from "./planner-config";

export class Semester {
    constructor(
        public id: string,
        public type: SemesterType,
        public modules: Module[]
    ) { }

    getCredits(): number {
        let sum = 0;
        this.modules.forEach(module => {
            sum += module.credits
        });

        return sum;
    }
}
