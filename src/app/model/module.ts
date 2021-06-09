import { CdkDropList } from "@angular/cdk/drag-drop";
import { Deserializable } from "./deserializable";
import { Execution } from "./execution";
import { Language } from "./language";
import { Requirement } from "./requirement";

export class Module implements Deserializable<Module> {
    id!: number;
    code!: string;
    name!: string;
    credits!: number;
    language!: Language[];
    type!: string;
    requirements!: Requirement[];

    executions!: Execution[];
    selectedExecution!: Execution | null;

    semesterModel!: boolean;
    fallSemesterModel!: boolean;
    springSemesterModel!: boolean;
    intensiveWeekModel!: boolean;

    initialLibraryContainer?: CdkDropList<Module[]>;

    deserialize(input: any): Module {
        Object.assign(this, input);

        this.language = [];
        input.language.forEach((lang: any) => {
            this.language.push(new Language().deserialize(lang));
        });

        this.requirements = [];
        input.requirements.forEach((req: any) => {
            this.requirements.push(new Requirement().deserialize(req));
        });

        this.executions = [];
        input.executions.forEach((execution: any) => {
            this.executions.push(new Execution().deserialize(execution));
        });

        return this;
    }
}

export enum MODULE_TYPE {
    CORE_ASSESSMENT = "KernModul Assessment",
    CORE_INTERMEDIATE = "KernModul Intermediate",
    EXTENSION = "Erweiterungsmodul",
    ADDITIVE = "Zusatzmodul",
    PROJECT = "Projektmodul",
}
