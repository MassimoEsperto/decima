import { InfoGenerali } from "./info.generali.dto";
import { Lookup } from "./lookup.dto";

export class ShitCup {
    info: InfoGenerali
    lookup: Lookup

    constructor(obj: ShitCup) {
        this.info = new InfoGenerali(obj.info);
        this.lookup = new Lookup(obj.lookup);
    }
}