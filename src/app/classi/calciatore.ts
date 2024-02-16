export class Calciatore {
    id: number = 0;
    nome: string = "";
    nickname: string = "";
    ruolo: string = "";
    icona: string = "";
    valore: number = 0;
    selected: boolean = false;
    disabled: boolean = false;

}


export class Listino {
    svincolati: Calciatore[] = [];
    rosa_attuale: Calciatore[] = [];
    crediti: number = 0;
    squadra: string = ""

    constructor(
        elements: any = null
    ) {
        if (elements) {
            this.svincolati = elements.svincolati;
            this.rosa_attuale = elements.rosa_attuale;
            this.crediti = elements.crediti;
            this.squadra = elements.squadra;
        }
    }

    get selezionati() {

        return this.svincolati.filter((e: { selected: boolean; }) => e.selected === true);//aggiungi condizione non svincolati

    }

    get countP() {
        return this.svincolati.
            filter((e: { ruolo: string; selected: boolean; }) => e.selected === true && e.ruolo == 'P').length;
    }

    get countD() {
        return this.svincolati.
            filter((e: { ruolo: string; selected: boolean; }) => e.selected === true && e.ruolo == 'D').length;
    }

    get countC() {
        return this.svincolati.
            filter((e: { ruolo: string; selected: boolean; }) => e.selected === true && e.ruolo == 'C').length;
    }

    get countA() {
        return this.svincolati.
            filter((e: { ruolo: string; selected: boolean; }) => e.selected === true && e.ruolo == 'A').length;
    }


    get spesa() {

        let lista = this.selezionati
        let crt: number = 0;

        if (lista.length > 0) {
            crt = lista.map(a => a.valore).reduce(function (a, b) {
                return a + b;
            });
        }

        return crt

    }

    get residuo() {

        let crt = this.spesa
        let res = this.crediti - crt
        return res

    }
}

export class Listone {
    portieri: Calciatore[] = [];
    difensori: Calciatore[] = [];
    centrocampisti: Calciatore[] = [];
    attaccanti: Calciatore[] = [];
    svincolati: Calciatore[] = [];
    residui: number = 0

    constructor(
        portieri: Calciatore[] = [],
        difensori: Calciatore[] = [],
        centrocampisti: Calciatore[] = [],
        attaccanti: Calciatore[] = []
    ) {
        this.portieri = portieri;
        this.difensori = difensori;
        this.centrocampisti = centrocampisti;
        this.attaccanti = attaccanti;
    }

    ini(lista: any) {
        if (lista) {
            this.portieri = lista.P;
            this.difensori = lista.D;
            this.centrocampisti = lista.C;
            this.attaccanti = lista.A;
        }
    }

    get selezionati() {

        let p = this.portieri.filter((e: { selected: boolean; }) => e.selected === true);//aggiungi condizione non svincolati
        let d = this.difensori.filter((e: { selected: boolean; }) => e.selected === true);
        let c = this.centrocampisti.filter((e: { selected: boolean; }) => e.selected === true);
        let a = this.attaccanti.filter((e: { selected: boolean; }) => e.selected === true);

        return [...p, ...d, ...c, ...a]

    }

    get crediti() {

        let lista = this.selezionati
        let crt: number = 0;

        if (lista.length > 0) {
            crt = lista.map(a => a.valore).reduce(function (a, b) {
                return a + b;
            });
        }

        return crt

    }

    get residuo() {

        let crt = this.crediti
        let res = this.residui - crt
        return res

    }

}

