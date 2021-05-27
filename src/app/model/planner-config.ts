export class PlannerConfig {
    constructor(
        public timeModel: TimeModel,
        public startSemester: SemesterType
    ) { }

}

export enum SemesterType {
    SPRING_SEMESTER = "Frühling",
    FALL_SEMESTER = "Herbst"
}

export enum TimeModel {
    FULL_TIME = "Vollzeit",
    PART_TIME = "Berufsbegleitend"
}
