import { Deserializable } from "./deserializable";
import { Requirement } from "./requirement";

export class MajorProgram implements Deserializable<MajorProgram> {
    id!: number;
    name!: string;
    code!: string;
    requirements!: Requirement[];

    deserialize(input: any): MajorProgram {
        Object.assign(this, input);
        this.requirements = [];
        input.requirements.forEach((req: any) => {
            this.requirements.push(new Requirement().deserialize(req));
        });
        return this;
    }
}
