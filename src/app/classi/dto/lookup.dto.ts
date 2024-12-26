export class Lookup {
    attivita: RepBase[] = [];
    fasi: RepFasi[] = [];
    frazioni: RepBase[] = [];
    moduli: RepModuli[] = [];
    ruoli: RepBase[] = [];
    stati: RepBase[] = [];
    condizione_girone: RepBase[] = [];

    constructor(obj: Lookup) {
        this.attivita = obj.attivita;
        this.fasi = obj.fasi;
        this.frazioni = obj.frazioni;
        this.moduli = obj.moduli;
        this.ruoli = obj.ruoli;
        this.stati = obj.stati;
        this.condizione_girone = obj.condizione_girone;
    }

    getFaseById(id: number) {
        return this.fasi.find(el => el.code == id)?.valore
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

class RepFasi {
    code: number;
    valore: string;
    partecipanti: number;

    constructor(obj: RepFasi) {
        this.code = obj.code;
        this.valore = obj.valore;
        this.partecipanti = obj.partecipanti;
    }
}

