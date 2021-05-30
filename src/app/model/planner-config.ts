import { DegreeProgram } from "./degree-program";
import { Deserializable } from "./deserializable";

export class PlannerConfig implements Deserializable<PlannerConfig> {
    constructor(
        public timeModel: TimeModel,
        public startSemester: SemesterType,
        public degreeProgram: DegreeProgram
    ) { }

    deserialize(input: any): PlannerConfig {
        Object.assign(this, input);
        return this;
    }

}

export enum SemesterType {
    SPRING_SEMESTER = "Frühling",
    FALL_SEMESTER = "Herbst"
}

export enum TimeModel {
    FULL_TIME = "Vollzeit",
    PART_TIME = "Berufsbegleitend"
}
