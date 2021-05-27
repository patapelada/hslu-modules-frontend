import { Deserializable } from "./deserializable";

export class Language implements Deserializable<Language> {
    isoCode?: string;
    name?: string;

    deserialize(input: any): Language {
        Object.assign(this, input);
        return this;
    }
}
