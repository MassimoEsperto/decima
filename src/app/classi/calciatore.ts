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

export class Listone {
    portieri: Calciatore[] = [];
    difensori: Calciatore[] = [];
    centrocampisti: Calciatore[] = [];
    attaccanti: Calciatore[] = [];
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

        let p = this.portieri.filter((e: { selected: boolean; }) => e.selected === true);
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

