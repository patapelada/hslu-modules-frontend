import { Deserializable } from "./deserializable";
import { valueOf, Week, WeekDay } from "./week";

export class Execution implements Deserializable<Execution> {
    id!: number;
    semester!: ExecutionSemester;
    blocks!: ExecutionBlock[];

    deserialize(input: any): Execution {
        Object.assign(this, input);
        this.blocks = [];

        input.blocks.forEach((block: any) => {
            this.blocks.push(new ExecutionBlock().deserialize(block));
        });
        return this;
    }
}

export class ExecutionSemester implements Deserializable<ExecutionSemester> {
    code!: string;
    year?: number;

    deserialize(input: any): ExecutionSemester {
        Object.assign(this, input);
        return this
    }

}

export class ExecutionBlock implements Deserializable<ExecutionBlock> {
    id!: number;
    number!: number;
    day!: WeekDay;

    deserialize(input: any): ExecutionBlock {
        Object.assign(this, input);
        this.day = valueOf(input.day);
        return this
    }

}
