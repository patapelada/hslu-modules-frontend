import { Deserializable } from "./deserializable";
import { Module } from "./module";

export class Requirement implements Deserializable<Requirement> {
    id!: number;
    inclusive!: boolean;
    levelName!: string;
    modules!: Module[];


    deserialize(input: any): Requirement {
        Object.assign(this, input);
        this.modules = [];
        input.modules.forEach((mod: any) => {
            this.modules.push(new Module().deserialize(mod));
        });
        return this;
    }
}
