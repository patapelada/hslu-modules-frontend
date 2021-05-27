import { Deserializable } from "./deserializable";
import { MajorProgram } from "./major-program";

export class DegreeProgram implements Deserializable<DegreeProgram> {
    id!: string;
    name!: string;
    majors!: MajorProgram[];

    deserialize(input: any): DegreeProgram {
        Object.assign(this, input);
        this.majors = [];
        input.majors.forEach((major: any) => {
            this.majors.push(new MajorProgram().deserialize(major));
        });
        return this;
    }
}
