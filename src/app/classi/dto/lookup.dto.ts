export class Lookup {
    ruoli: RepBase[] = [];
    fasi: RepBase[] = [];
    turni: RepTurni[] = [];
    saldo: RepBase[] = [];
    stati: RepBase[] = [];
    frazioni: RepBase[] = [];
    moduli: RepModuli[] = [];
    condizione_girone: RepBase[] = [];
    boleano: RepBase[] = [
        { code: 1, valore: "SI" },
        { code: 0, valore: "NO" }
    ];
    provenienza: RepBase[] = [
        { code: 1, valore: "FANTA" },
        { code: 2, valore: "LISTONE" }
    ]

    constructor(obj: Lookup) {
        this.turni = obj.turni;
        this.fasi = obj.fasi;
        this.frazioni = obj.frazioni;
        this.moduli = obj.moduli;
        this.ruoli = obj.ruoli;
        this.stati = obj.stati;
        this.condizione_girone = obj.condizione_girone;
        this.saldo = obj.saldo;
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
    quantita: number;

    constructor(obj: RepTurni) {
        this.code = obj.code;
        this.valore = obj.valore;
        this.partecipanti = obj.partecipanti;
        this.quantita = obj.quantita;
    }
}

export const LOOKUPS = {

    RUOLI: {
        GHOST: 1,
        PLAYER: 2,
        ADMIN: 3
    },
    FASI: {
        ISCRIZIONE: 1,
        MERCATO: 2,
        COMPETIZIONE: 3
    },
    TURNI: {
        GIRONI: 1,
        SPAREGGI: 2,
        OTTAVI: 3,
        QUARTI: 4,
        SEMIFINALE: 5,
        FINALE: 6
    },
    SALDO: {
        DEBITO: 1,
        PAGANTE: 2
    },
    STATI: {
        REGISTRATA: 1,
        ISCRITTA: 2,
        ELIMINATA: 3,
        VINCITRICE: 4
    },
    FRAZIONI: {
        PREPARTITA: 1,
        INCORSO: 2,
        POSTPARTITA: 3
    },
    MODULI: {
        DCCAA: 1,
        DDCAA: 2,
        DDCCA: 3,
        PDDCA: 4,
        PDCCA: 5,
        PDCAA: 6,
        NNNNN: 7
    },
    CONDIZIONE_GIRONE: {
        QUALIFICATA: 1,
        SPAREGGIO: 2,
        ELIMINATA: 3
    },
    SORTEGGI: {
        GIORNATE: 1,
        GIRONI: 2,
        ELIMINATORIE: 3
    },
    PROVENIENZA: {
        FANTA: 1,
        LISTONE: 2
    }

}
