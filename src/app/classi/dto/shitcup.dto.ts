import { Info } from "./info.dto";
import { Lookup } from "./lookup.dto";

export class ShitCup {
    info: Info
    lookup: Lookup

    constructor(obj: ShitCup) {
        this.info = new Info(obj.info);
        this.lookup = new Lookup(obj.lookup);
    }
}