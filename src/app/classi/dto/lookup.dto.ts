export class Lookup {
    fasi: RepBase[] = [];
    turni: RepTurni[] = [];
    frazioni: RepBase[] = [];
    moduli: RepModuli[] = [];
    ruoli: RepBase[] = [];
    stati: RepBase[] = [];
    condizione_girone: RepBase[] = [];
    debiti: RepBase[] = [];

    constructor(obj: Lookup) {
        this.turni = obj.turni;
        this.fasi = obj.fasi;
        this.frazioni = obj.frazioni;
        this.moduli = obj.moduli;
        this.ruoli = obj.ruoli;
        this.stati = obj.stati;
        this.condizione_girone = obj.condizione_girone;
        this.debiti = obj.debiti;
    }

    getTurniById(id: number) {
        return this.turni.find(el => el.code == id)?.valore
    }
}

class RepBase {
    code: number
    valore: string

    constructor(obj: RepBase) {
        this.code = obj.code;
        this.valore = obj.valore;
    }
}

class RepModuli {
    code: number;
    valore: string;
    indice: string;
    num_p: number;
    num_d: number;
    num_c: number;
    num_a: number;
    bonus: number;

    constructor(obj: RepModuli) {
        this.code = obj.code;
        this.valore = obj.valore;

        this.indice = obj.indice;
        this.num_p = obj.num_p;
        this.num_d = obj.num_d;
        this.num_c = obj.num_c;
        this.num_a = obj.num_a;
        this.bonus = obj.bonus;
    }
}

export class RepTurni {
    code: number;
    valore: string;
    partecipanti: number;
    bonus: number;

    constructor(obj: RepTurni) {
        this.code = obj.code;
        this.valore = obj.valore;
        this.partecipanti = obj.partecipanti;
        this.bonus = obj.bonus;
    }
}

